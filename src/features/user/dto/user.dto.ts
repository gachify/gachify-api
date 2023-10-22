import { ApiProperty } from '@nestjs/swagger'

import { AbstractDto } from '@common/dto'

export class UserDto extends AbstractDto {
  @ApiProperty()
  readonly username: string

  @ApiProperty()
  readonly email: string
}
