import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcrypt'
import { JwtPayload } from 'jsonwebtoken'

import { LoginPayloadDto, LoginUserDto, RegisterUserDto } from './dto'

import { environment } from '@environment'
import { UserService } from '@features/user/user.service'
import { CreateUserDto } from '@features/user/dto'
import { UserEntity } from '@features/user/entities'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login({ username, password }: LoginUserDto): Promise<LoginPayloadDto> {
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

      return {
        user,
        token: {
          accessToken,
        },
      }
    } catch (error) {
      throw new UnauthorizedException()
    }
  }

  async register(input: RegisterUserDto): Promise<UserEntity> {
    const passwordHash = await this.getPasswordHash(input.password)
    const createUserDto: CreateUserDto = { hash: passwordHash, username: input.username }

    // @todo validate invitationCode

    return this.userService.createUser(createUserDto)
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

  private async getPasswordHash(password: string): Promise<string> {
    return hash(password, environment.USER_PASSWORD_BCRYPT_SALT_ROUNDS)
  }
}
