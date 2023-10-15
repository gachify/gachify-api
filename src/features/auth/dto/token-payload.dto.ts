import { ApiProperty } from '@nestjs/swagger'

export class TokenPayloadDto {
  @ApiProperty()
  readonly accessToken: string
}
