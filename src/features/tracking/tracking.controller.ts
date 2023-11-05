import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

import { PlaybackEventDto } from './dto'
import { TrackingService } from './tracking.service'
import { PlaybackEventEntity } from './entities'

import { CurrentUser } from '@features/auth/decorators'
import { UserAccountEntity } from '@features/user/entities'

@Controller('tracking')
@ApiTags('Tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post('playback')
  @ApiCreatedResponse({
    status: HttpStatus.OK,
  })
  trackPlaybackEvent(
    @Body() playbackEventDto: PlaybackEventDto,
    @CurrentUser() userAccount: UserAccountEntity,
  ): Promise<void> {
    return this.trackingService.trackPlaybackEvent(playbackEventDto, userAccount)
  }
}
