import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PlaylistService } from './playlist.service'
import { PlaylistController } from './playlist.controller'
import { PlaylistEntity } from './entities'

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity])],
  providers: [PlaylistService],
  controllers: [PlaylistController],
  exports: [PlaylistService],
})
export class PlaylistModule {}
