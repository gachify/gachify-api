import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserAccountEntity, UserLoginDataEntity, UserLoginLogEntity } from './entities'
import { UserAccountService, UserLoginDataService, UserLoginLogService } from './services'

@Module({
  imports: [TypeOrmModule.forFeature([UserAccountEntity, UserLoginDataEntity, UserLoginLogEntity])],
  providers: [UserAccountService, UserLoginDataService, UserLoginLogService],
  controllers: [],
  exports: [UserAccountService, UserLoginDataService, UserLoginLogService],
})
export class UserModule {}
