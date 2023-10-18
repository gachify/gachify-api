import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { createReadStream } from 'fs'
import { join } from 'path'

import { SongEntity } from './entities'
import { CreateSongDto } from './dto'
import { YoutubeService } from './youtube.service'

import { ArtistEntity } from '@features/artist/entities'
import { AnalyticsService } from '@features/analytics'
import { UserEntity } from '@features/user/entities'

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

  async streamSong(currentUser: UserEntity, songId: string): Promise<StreamableFile> {
    const song = await this.songRepository.findOneBy({ uuid: songId })

    if (!song) {
      throw new NotFoundException()
    }

    song.playbackCount = song.playbackCount + 1

    await Promise.all([
      this.songRepository.save(song),
      this.analyticsService.updateUserAnalytics(currentUser.uuid, song),
    ])

    const file = createReadStream(join(process.cwd(), `${songId}.mp3`))
    return new StreamableFile(file)
  }

  async createSong(createSongDto: CreateSongDto): Promise<SongEntity> {
    const video = await this.youtubeService.getInfo(createSongDto.youtubeUrl)

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

      await this.youtubeService.download(createSongDto.youtubeUrl, song.uuid)

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
}
