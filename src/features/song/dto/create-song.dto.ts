import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Matches } from 'class-validator'

import { YOUTUBE_URL_REGEX } from '../song.constants'

export class CreateSongDto {
  @ApiProperty()
  @IsNotEmpty()
  @Matches(YOUTUBE_URL_REGEX)
  readonly youtubeUrl: string
}
