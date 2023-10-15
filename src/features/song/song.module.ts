import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SongService } from './song.service'
import { SongController } from './song.controller'
import { SongEntity } from './entities'

@Module({
  imports: [TypeOrmModule.forFeature([SongEntity])],
  providers: [SongService],
  controllers: [SongController],
  exports: [SongService],
})
export class SongModule {}
