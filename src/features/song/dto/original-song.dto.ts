import { ApiProperty } from '@nestjs/swagger'

export class OriginalSongDto {
  @ApiProperty()
  readonly id: string

  @ApiProperty()
  readonly title: string
}
