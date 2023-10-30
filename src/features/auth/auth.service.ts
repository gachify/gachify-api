import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcrypt'
import { JwtPayload } from 'jsonwebtoken'

import { LoginUserDto, RegisterUserDto } from './dto'

import { UserAccountService, UserLoginDataService } from '@features/user/services'
import { UserAccountEntity } from '@features/user/entities'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userLoginDataService: UserLoginDataService,
    private readonly userAccountService: UserAccountService,
  ) {}

  async login({ email, password }: LoginUserDto): Promise<UserAccountEntity> {
    try {
      const userLoginData = await this.userLoginDataService.findByEmail(email)

      if (!userLoginData) {
        throw new UnauthorizedException()
      }

      // If password is not matching with any user
      if (!compareSync(password, userLoginData.passwordHash)) {
        throw new UnauthorizedException()
      }

      return userLoginData.userAccount
    } catch (error) {
      throw new UnauthorizedException()
    }
  }

  async register({ username, email, password }: RegisterUserDto): Promise<UserAccountEntity> {
    const userAccount = await this.userAccountService.createUserAccount(username, email, password)

    return userAccount
  }

  getUserFromToken(token: string): Promise<UserAccountEntity | null> {
    const { id } = this.jwtService.verify(token)

    return this.userAccountService.findById(id)
  }

  getJwtAccessToken(userAccount: UserAccountEntity): string {
    const payload: JwtPayload = {
      id: userAccount.id,
    }

    return this.jwtService.sign(payload)
  }
}
