import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { AnalyticsEntity } from './entities'

import { UserService } from '@features/user/user.service'
import { SongEntity } from '@features/song/entities'

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(AnalyticsEntity)
    private readonly analyticsRepository: Repository<AnalyticsEntity>,
    private readonly userService: UserService,
  ) {}

  async updateUserAnalytics(userId: string, song: SongEntity): Promise<void> {
    const user = await this.userService.findById(userId)

    if (!user) {
      throw new InternalServerErrorException()
    }

    let analytics = await this.analyticsRepository.findOneBy({ user: { uuid: user.uuid } })

    if (!analytics) {
      analytics = this.analyticsRepository.create({ user, totalDuration: 0, songCount: 0 })
    }

    analytics.totalDuration = analytics.totalDuration + song.duration
    analytics.songCount = analytics.songCount + 1

    await this.analyticsRepository.save(analytics)
  }
}
