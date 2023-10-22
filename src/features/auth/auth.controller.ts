import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FastifyReply } from 'fastify'

import { LoginUserDto, RegisterUserDto } from './dto'
import { AuthService } from './auth.service'
import { CurrentUser, Public } from './decorators'
import { SESSION_COOKIE } from './session-cookie.constant'

import { UserDto } from '@features/user/dto'
import { UserEntity } from '@features/user/entities'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @Public()
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: UserDto,
  })
  async register(@Res() res: FastifyReply, @Body() input: RegisterUserDto): Promise<void> {
    const user = await this.authService.register(input, res)
    res.send(user)
  }

  @Post('/login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: UserDto,
  })
  async login(@Res() res: FastifyReply, @Body() input: LoginUserDto): Promise<void> {
    const user = await this.authService.login(input, res)
    res.send(user)
  }

  @Get('/whoami')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: UserDto,
  })
  whoami(@CurrentUser() user: UserEntity): UserDto {
    return { uuid: user.uuid, username: user.username, email: user.email }
  }

  @Get('/logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout' })
  logout(@Res() res: FastifyReply) {
    res.clearCookie(SESSION_COOKIE)
  }
}
