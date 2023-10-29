import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { genSaltSync, hashSync } from 'bcrypt'

import { UserLoginDataEntity } from '../entities'

import { environment } from '@environment'

@Injectable()
export class UserLoginDataService {
  constructor(
    @InjectRepository(UserLoginDataEntity)
    private readonly userLoginDataRepository: Repository<UserLoginDataEntity>,
  ) {}

  createUserLoginDataEntity(userId: string, email: string, password: string): UserLoginDataEntity {
    const passwordSalt = genSaltSync(environment.USER_PASSWORD_BCRYPT_SALT_ROUNDS)
    const passwordHash = hashSync(password, passwordSalt)

    return this.userLoginDataRepository.create({
      userId,
      email,
      passwordHash,
      passwordSalt,
    })
  }

  findByEmail(email: string): Promise<UserLoginDataEntity | null> {
    return this.userLoginDataRepository.findOne({ where: { email }, relations: { userAccount: true } })
  }
}
