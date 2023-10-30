import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FastifyReply } from 'fastify'

import { LoginUserDto, RegisterUserDto } from './dto'
import { AuthService } from './auth.service'
import { CurrentUser, Public } from './decorators'
import { SESSION_COOKIE } from './session-cookie.constant'

import { UserAccountEntity } from '@features/user/entities'
import { environment } from '@environment'
import { UserAccountDto } from '@features/user/dto'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @Public()
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: UserAccountDto,
  })
  async register(@Res() res: FastifyReply, @Body() input: RegisterUserDto): Promise<void> {
    const userAccount = await this.authService.register(input)
    this.setSessionCookie(res, userAccount)

    res.send(userAccount)
  }

  @Post('/login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: UserAccountDto,
  })
  async login(@Res() res: FastifyReply, @Body() input: LoginUserDto): Promise<void> {
    const userAccount = await this.authService.login(input)
    this.setSessionCookie(res, userAccount)

    res.send(userAccount)
  }

  @Get('/whoami')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: UserAccountDto,
  })
  whoami(@CurrentUser() user: UserAccountEntity): UserAccountDto {
    return { id: user.id, username: user.username }
  }

  @Get('/logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout' })
  logout(@Res() res: FastifyReply) {
    res.clearCookie(SESSION_COOKIE)
  }

  private setSessionCookie(res: FastifyReply, userAccount: UserAccountEntity): void {
    const accessToken = this.authService.getJwtAccessToken(userAccount)

    res.setCookie(SESSION_COOKIE, accessToken, {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
      signed: true,
      maxAge: environment.JWT_TOKEN_EXPIRATION_TIME,
    })
  }
}
