import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PlaybackEventEntity } from './entities'
import { TrackingController } from './tracking.controller'
import { TrackingService } from './tracking.service'

import { SongEntity } from '@features/song/entities'

@Module({
  imports: [TypeOrmModule.forFeature([PlaybackEventEntity, SongEntity])],
  providers: [TrackingService],
  controllers: [TrackingController],
})
export class TrackingModule {}
