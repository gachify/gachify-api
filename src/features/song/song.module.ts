import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SongService } from './song.service'
import { SongController } from './song.controller'
import { OriginalSongEntity, SongEntity } from './entities'
import { YoutubeService } from './youtube.service'

import { ArtistEntity } from '@features/artist/entities'

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity, OriginalSongEntity, SongEntity])],
  providers: [SongService, YoutubeService],
  controllers: [SongController],
  exports: [SongService],
})
export class SongModule {}
