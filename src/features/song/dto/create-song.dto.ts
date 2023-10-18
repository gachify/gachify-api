import { ApiProperty } from '@nestjs/swagger'

export class CreateSongDto {
  @ApiProperty()
  readonly youtubeUrl: string
}
