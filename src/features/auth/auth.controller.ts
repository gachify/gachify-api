import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { LoginPayloadDto, LoginUserDto, RegisterUserDto } from './dto'
import { AuthService } from './auth.service'
import { Public } from './decorators'

import { UserDto } from '@features/user/dto'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @Public()
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: UserDto,
  })
  async register(@Body() input: RegisterUserDto): Promise<UserDto> {
    return this.authService.register(input)
  }

  @Post('/login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: LoginPayloadDto,
  })
  async login(@Body() input: LoginUserDto): Promise<LoginPayloadDto> {
    return this.authService.login(input)
  }

  @Get('/logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout' })
  async logout() {
    // return await this.authService.removeRefreshToken();
  }
}
