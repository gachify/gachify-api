import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { createReadStream, statSync } from 'fs'
import { join } from 'path'

import { SongEntity } from './entities'
import { CreateSongDto, SongsPageDto, SongsPageOptionsDto } from './dto'
import { YoutubeService } from './youtube.service'
import { MEDIA_PATH } from '../../app.constants'

import { ArtistEntity } from '@features/artist/entities'
import { AnalyticsService } from '@features/analytics'
import { UserEntity } from '@features/user/entities'
import { PageMetaDto } from '@common/dto'

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(SongEntity)
    private readonly songRepository: Repository<SongEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    private readonly dataSource: DataSource,
    private readonly youtubeService: YoutubeService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  async updatePlaybackCount(currentUser: UserEntity, songId: string): Promise<void> {
    const song = await this.songRepository.findOneBy({ uuid: songId })

    if (song) {
      song.playbackCount = song.playbackCount + 1

      await Promise.all([
        this.songRepository.save(song),
        this.analyticsService.updateUserAnalytics(currentUser.uuid, song),
      ])
    }
  }

  async createSong(createSongDto: CreateSongDto): Promise<SongEntity> {
    const videoCode = this.youtubeService.getVideoCode(createSongDto.youtubeUrl)
    const video = await this.youtubeService.getInfo(videoCode)

    const songExists = await this.songRepository.findOneBy({ name: video.title })

    if (songExists) {
      throw new BadRequestException()
    }

    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const song = this.songRepository.create({ name: video.title, duration: video.duration })

      const artistName = video.channel

      let artist = await queryRunner.manager.findOne(ArtistEntity, { where: { name: artistName } })

      if (!artist) {
        artist = this.artistRepository.create({ name: artistName })

        await queryRunner.manager.save(artist)
      }

      song.artist = artist

      await queryRunner.manager.save(song)

      await this.youtubeService.download(videoCode, song.uuid)

      await queryRunner.commitTransaction()

      return song
    } catch (error) {
      await queryRunner.rollbackTransaction()

      throw new InternalServerErrorException()
    } finally {
      await queryRunner.release()
    }
  }

  async searchSong(songId: string): Promise<SongEntity> {
    const song = await this.songRepository.findOne({ relations: ['artist'], where: { uuid: songId } })

    if (!song) {
      throw new NotFoundException()
    }

    return song
  }

  popularSongs(): Promise<SongEntity[]> {
    return this.songRepository.find({
      relations: ['artist'],
      take: 12,
      order: { playbackCount: 'DESC', createdAt: 'DESC' },
    })
  }

  async getSongs(pageOptionsDto: SongsPageOptionsDto): Promise<SongsPageDto> {
    const [songs, songsCount] = await this.songRepository.findAndCount({
      relations: ['artist'],
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
