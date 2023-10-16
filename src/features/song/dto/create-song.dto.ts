import { ApiProperty } from '@nestjs/swagger'

export class CreateSongDto {
  @ApiProperty()
  readonly name: string

  @ApiProperty({ type: () => Number })
  readonly duration: number

  @ApiProperty()
  readonly artistId: string
}
