import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PlaylistService } from './playlist.service'
import { PlaylistController } from './playlist.controller'
import { PlaylistEntity } from './entities'

import { SongEntity } from '@features/song/entities'

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity, SongEntity])],
  providers: [PlaylistService],
  controllers: [PlaylistController],
  exports: [PlaylistService],
})
export class PlaylistModule {}
