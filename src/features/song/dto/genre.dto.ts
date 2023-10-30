import { ApiProperty } from '@nestjs/swagger'

export class GenreDto {
  @ApiProperty()
  readonly id: string

  @ApiProperty()
  readonly name: string
}
