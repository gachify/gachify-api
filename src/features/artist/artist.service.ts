import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ArtistEntity } from './entities'
import { CreateArtistDto } from './dto'

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async createArtist(artistDto: CreateArtistDto): Promise<ArtistEntity> {
    const artist = this.artistRepository.create({ name: artistDto.name })

    return this.artistRepository.save(artist)
  }

  async searchArtist(artistId: string): Promise<ArtistEntity> {
    const artist = await this.artistRepository.findOne({ relations: ['songs'], where: { uuid: artistId } })

    if (!artist) {
      throw new NotFoundException()
    }

    return artist
  }
}
