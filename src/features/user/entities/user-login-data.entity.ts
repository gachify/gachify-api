import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'

import { UserAccountEntity } from './user-account.entity'

import { UserLoginDataTable } from '@common/tables'
import { toColumnOptions, toPrimaryColumnOptions } from '@common/utils'

@Entity({ name: UserLoginDataTable.name })
export class UserLoginDataEntity {
  @PrimaryColumn(toPrimaryColumnOptions(UserLoginDataTable.userIdColumn))
  userId: string

  @Column(toColumnOptions(UserLoginDataTable.emailColumn))
  email: string

  @Column(toColumnOptions(UserLoginDataTable.passwordHashColumn))
  passwordHash: string

  @Column(toColumnOptions(UserLoginDataTable.passwordSaltColumn))
  passwordSalt: string

  @OneToOne(() => UserAccountEntity, (userAccount) => userAccount.userLoginData)
  @JoinColumn(UserLoginDataTable.userIdColumn)
  userAccount: UserAccountEntity
}
