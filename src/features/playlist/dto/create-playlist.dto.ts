import { ApiProperty } from '@nestjs/swagger'

export class CreatePlaylistDto {
  @ApiProperty()
  readonly name: string
}
