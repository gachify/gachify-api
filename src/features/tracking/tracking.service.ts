import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PlaybackEventEntity } from './entities'
import { PlaybackEventDto } from './dto'

import { UserAccountEntity } from '@features/user/entities'
import { SongEntity } from '@features/song/entities'

@Injectable()
export class TrackingService {
  private readonly logger = new Logger(TrackingService.name)

  constructor(
    @InjectRepository(PlaybackEventEntity)
    private readonly playbackEventRepository: Repository<PlaybackEventEntity>,
    @InjectRepository(SongEntity)
    private readonly songRepository: Repository<SongEntity>,
  ) {}

  async trackPlaybackEvent(playbackEventDto: PlaybackEventDto, userAccount: UserAccountEntity): Promise<void> {
    const playbackEvent = this.playbackEventRepository.create({
      userId: userAccount.id,
      songId: playbackEventDto.songId,
    })

    await Promise.all([
      this.songRepository.update({ id: playbackEventDto.songId }, { playbackCount: () => 'playbackCount + 1' }),
      this.playbackEventRepository.save(playbackEvent),
    ])
  }
}
