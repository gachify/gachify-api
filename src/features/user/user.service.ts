import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
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
    const user = this.usersRepository.create(createUserDto)

    const [emailTaken, usernameTaken] = await Promise.all([
      this.usersRepository.exist({ where: { email: createUserDto.email } }),
      this.usersRepository.exist({ where: { username: createUserDto.username } }),
    ])

    if (emailTaken || usernameTaken) {
      throw new BadRequestException({ emailTaken, usernameTaken })
    }

    return this.usersRepository.save(user)
  }

  findOneByUsername(username: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ username })
  }

  findById(userId: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ uuid: userId })
  }
}
