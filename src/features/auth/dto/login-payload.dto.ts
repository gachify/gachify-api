import { ApiProperty } from '@nestjs/swagger'

import { TokenPayloadDto } from './token-payload.dto'

import { UserDto } from '@features/user/dto'

export class LoginPayloadDto {
  @ApiProperty({ type: () => UserDto })
  readonly user: UserDto

  @ApiProperty({ type: () => TokenPayloadDto })
  readonly token: TokenPayloadDto
}
