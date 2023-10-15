import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { SongEntity } from './entities'

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(SongEntity)
    private readonly songRepository: Repository<SongEntity>,
  ) {}
}
