import { ApiProperty } from '@nestjs/swagger'

export class AbstractDto {
  @ApiProperty()
  readonly uuid: string
}
