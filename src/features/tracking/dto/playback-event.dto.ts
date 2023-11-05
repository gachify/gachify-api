import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class PlaybackEventDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly songId: string
}
