import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcrypt'
import { FastifyReply } from 'fastify'
import { JwtPayload } from 'jsonwebtoken'

import { LoginUserDto, RegisterUserDto } from './dto'
import { SESSION_COOKIE } from './session-cookie.constant'

import { environment } from '@environment'
import { UserService } from '@features/user/user.service'
import { CreateUserDto, UserDto } from '@features/user/dto'
import { UserEntity } from '@features/user/entities'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login({ username, password }: LoginUserDto, res: FastifyReply): Promise<UserDto> {
    try {
      const user = await this.userService.findOneByUsername(username)

      if (!user) {
        throw new UnauthorizedException()
      }

      // If password is not matching with any user
      if (!(await compare(password, user.hash))) {
        throw new UnauthorizedException()
      }

      const accessToken = await this.getJwtAccessToken(user)
      this.setSessionCookie(res, accessToken)

      return { uuid: user.uuid, username: user.username, email: user.email }
    } catch (error) {
      throw new UnauthorizedException()
    }
  }

  async register(input: RegisterUserDto, res: FastifyReply): Promise<UserDto> {
    try {
      const passwordHash = await this.getPasswordHash(input.password)
      const createUserDto: CreateUserDto = { hash: passwordHash, email: input.email, username: input.username }

      // @todo validate invitationCode

      const user = await this.userService.createUser(createUserDto)

      const accessToken = await this.getJwtAccessToken(user)
      this.setSessionCookie(res, accessToken)

      return { uuid: user.uuid, username: user.username, email: user.email }
    } catch (error) {
      throw new UnauthorizedException()
    }
  }

  async getUserFromToken(token: string): Promise<UserEntity | null> {
    const { id } = await this.jwtService.verifyAsync(token)

    return this.userService.findById(id)
  }

  private getJwtAccessToken(user: UserEntity) {
    const payload: JwtPayload = {
      id: user.uuid,
    }

    return this.jwtService.signAsync(payload)
  }

  private setSessionCookie(res: FastifyReply, accessToken: string) {
    res.setCookie(SESSION_COOKIE, accessToken, {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
      signed: true,
      maxAge: environment.JWT_TOKEN_EXPIRATION_TIME,
    })
  }

  private async getPasswordHash(password: string): Promise<string> {
    return hash(password, environment.USER_PASSWORD_BCRYPT_SALT_ROUNDS)
  }
}
