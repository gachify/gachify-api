import { ApiProperty } from '@nestjs/swagger'

export class CreatePlaylistDto {
  @ApiProperty()
  readonly name: string

  @ApiProperty({ type: () => [String] })
  readonly songIds: string[]
}
