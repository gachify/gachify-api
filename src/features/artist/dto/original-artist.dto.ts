import { ApiProperty } from '@nestjs/swagger'

export class OriginalArtistDto {
  @ApiProperty()
  readonly id: string

  @ApiProperty()
  readonly name: string
}
