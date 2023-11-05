import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, In, Repository } from 'typeorm'
import { createReadStream, statSync } from 'fs'
import { join } from 'path'

import { SongEntity, SongUploadLogEntity } from './entities'
import { CreateSongDto, SongsPageDto, SongsPageOptionsDto } from './dto'
import { YoutubeService } from './youtube.service'
import { MEDIA_PATH } from '../../app.constants'

import { ArtistEntity } from '@features/artist/entities'
import { PageMetaDto } from '@common/dto'
import { UserAccountEntity } from '@features/user/entities'

@Injectable()
export class SongService {
  private readonly logger = new Logger(SongService.name)

  constructor(
    @InjectRepository(SongEntity)
    private readonly songRepository: Repository<SongEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    private readonly dataSource: DataSource,
    private readonly youtubeService: YoutubeService,
  ) {}

  async createSong(userAccount: UserAccountEntity, createSongDto: CreateSongDto): Promise<SongEntity> {
    const videoCode = this.youtubeService.getVideoCode(createSongDto.youtubeUrl)
    const video = await this.youtubeService.getInfo(videoCode)

    console.log(video.duration)

    const songExists = await this.songRepository.findOneBy({ title: video.title })

    if (songExists) {
      throw new BadRequestException()
    }

    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      // const [language, genres, tags] = await Promise.all([
      //   queryRunner.manager.findOneByOrFail(LanguageEntity, { id: createSongDto.languageId }),
      //   queryRunner.manager.findBy(GenreEntity, { id: In(createSongDto.genreIds) }),
      //   queryRunner.manager.findBy(TagEntity, { id: In(createSongDto.tagIds) }),
      // ])

      const song = this.songRepository.create({
        // language,
        // genres,
        // tags,
        title: video.title,
        duration: video.duration,
        youtubeUrl: video.webpage_url,
      })

      let artist = await queryRunner.manager.findOne(ArtistEntity, { where: { youtubeUrl: video.channel_url } })

      if (!artist) {
        artist = this.artistRepository.create({ name: video.channel, youtubeUrl: video.channel_url })

        await queryRunner.manager.save(artist)
      }

      song.artist = artist

      await queryRunner.manager.save(song)
      await queryRunner.manager.save(
        queryRunner.manager.create(SongUploadLogEntity, { userId: userAccount.id, songId: song.id }),
      )

      await this.youtubeService.download(videoCode, song.id)

      await queryRunner.commitTransaction()

      return song
    } catch (error) {
      await queryRunner.rollbackTransaction()
      this.logger.debug(error)
      throw new InternalServerErrorException()
    } finally {
      await queryRunner.release()
    }
  }

  async searchSong(songId: string): Promise<SongEntity> {
    const song = await this.songRepository.findOne({
      relations: { artist: true, tags: true, language: true, genres: true },
      where: { id: songId },
    })

    if (!song) {
      throw new NotFoundException()
    }

    return song
  }

  async popularSongs(pageOptionsDto: SongsPageOptionsDto): Promise<SongsPageDto> {
    const [songs, songsCount] = await this.songRepository.findAndCount({
      relations: { artist: true },
      order: { playbackCount: 'desc', title: 'asc' },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
    })

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: songsCount,
    })

    return new SongsPageDto(songs, pageMetaDto)
  }

  async getSongs(pageOptionsDto: SongsPageOptionsDto): Promise<SongsPageDto> {
    const [songs, songsCount] = await this.songRepository.findAndCount({
      relations: { artist: true },
      order: { title: 'asc' },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
    })

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: songsCount,
    })

    return new SongsPageDto(songs, pageMetaDto)
  }

  async getSongsByArtistId(artistId: string, pageOptionsDto: SongsPageOptionsDto): Promise<SongsPageDto> {
    const [songs, songsCount] = await this.songRepository.findAndCount({
      where: { artist: { id: artistId } },
      relations: { artist: true },
      order: { title: 'asc' },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
    })

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: songsCount,
    })

    return new SongsPageDto(songs, pageMetaDto)
  }

  getAudioStreamById(songId: string): StreamableFile {
    const file = createReadStream(this.getSongPath(songId))
    return new StreamableFile(file)
  }

  getPartialAudioStreamById(songId: string, range: string) {
    const songPath = this.getSongPath(songId)
    const { size } = statSync(songPath)

    const { start, end } = this.parseRange(range, size)

    const stream = createReadStream(songPath, { start, end })

    const streamableFile = new StreamableFile(stream)

    const contentRange = this.getContentRange(start, end, size)

    return {
      streamableFile,
      contentRange,
    }
  }

  private parseRange(range: string, size: number) {
    const parts = range.replace(/bytes=/, '').split('-')
    const start = parseInt(parts[0], 10)
    const end = parts[1] ? parseInt(parts[1], 10) : size - 1

    return { start, end }
  }

  private getContentRange(rangeStart: number, rangeEnd: number, fileSize: number) {
    return `bytes ${rangeStart}-${rangeEnd}/${fileSize}`
  }

  private getSongPath(songId: string): string {
    return join(MEDIA_PATH, `${songId}.mp3`)
  }
}
