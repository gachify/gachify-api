import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserService } from './user.service'
import { UserEntity } from './entities'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  controllers: [],
  exports: [UserService],
})
export class UserModule {}
