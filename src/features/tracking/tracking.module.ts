import { Module } from '@nestjs/common'

import { TrackingController } from './tracking.controller'

@Module({
  imports: [],
  controllers: [TrackingController],
  providers: [],
})
export class TrackingModule {}
