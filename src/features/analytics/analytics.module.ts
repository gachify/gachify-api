import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AnalyticsEntity } from './entities'
import { AnalyticsService } from './analytics.service'

import { UserModule } from '@features/user'

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([AnalyticsEntity])],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
