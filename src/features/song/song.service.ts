import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { SongEntity } from './entities'
import { CreateSongDto } from './dto'

import { ArtistEntity } from '@features/artist/entities'

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(SongEntity)
    private readonly songRepository: Repository<SongEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async createSong(songDto: CreateSongDto): Promise<SongEntity> {
    const song = this.songRepository.create({ name: songDto.name, duration: songDto.duration })

    const artist = await this.artistRepository.findOne({ where: { uuid: songDto.artistId } })

    if (!artist) {
      throw new NotFoundException()
    }

    song.artist = artist

    return this.songRepository.save(song)
  }

  async searchSong(songId: string): Promise<SongEntity> {
    const song = await this.songRepository.findOne({ relations: ['artist'], where: { uuid: songId } })

    if (!song) {
      throw new NotFoundException()
    }

    return song
  }
}
