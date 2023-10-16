import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from './entities'
import { CreateUserDto } from './dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const queryRunner = this.usersRepository.queryRunner

    if (!queryRunner) {
      throw new InternalServerErrorException()
    }

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const user = this.usersRepository.create(createUserDto)
      await queryRunner.manager.save(user)

      await queryRunner.commitTransaction()

      return user
    } catch (error) {
      await queryRunner.rollbackTransaction()

      throw new InternalServerErrorException()
    } finally {
      await queryRunner.release()
    }
  }

  findOneByUsername(username: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ username })
  }

  findById(userId: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ uuid: userId })
  }
}
