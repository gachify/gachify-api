import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { UserDto } from '@features/user/dto'

@Controller('tracking')
@ApiTags('tracking')
export class TrackingController {
  @Post('/play')
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: UserDto,
  })
  async play(@Body() input: any): Promise<UserDto> {
    return this.authService.register(input)
  }

  @Post('/like')
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: UserDto,
  })
  async like(@Body() input: any): Promise<UserDto> {
    return this.authService.register(input)
  }
}
