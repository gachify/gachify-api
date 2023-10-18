import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SongService } from './song.service'
import { SongController } from './song.controller'
import { SongEntity } from './entities'
import { YoutubeService } from './youtube.service'

import { ArtistEntity } from '@features/artist/entities'
import { AnalyticsModule } from '@features/analytics'

@Module({
  imports: [AnalyticsModule, TypeOrmModule.forFeature([ArtistEntity, SongEntity])],
  providers: [SongService, YoutubeService],
  controllers: [SongController],
  exports: [SongService],
})
export class SongModule {}
