import { ApiProperty } from '@nestjs/swagger'

export class CreateArtistDto {
  @ApiProperty()
  readonly name: string
}
