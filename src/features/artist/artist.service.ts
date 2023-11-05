import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ArtistEntity } from './entities'

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async findById(artistId: string): Promise<ArtistEntity> {
    const artist = await this.artistRepository.findOne({ relations: ['songs'], where: { id: artistId } })

    if (!artist) {
      throw new NotFoundException()
    }

    return artist
  }
}
