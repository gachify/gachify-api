import { ApiProperty } from '@nestjs/swagger'

export class LanguageDto {
  @ApiProperty()
  readonly id: string

  @ApiProperty()
  readonly name: string
}
