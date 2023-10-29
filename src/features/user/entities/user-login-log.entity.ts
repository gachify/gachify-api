import { Column, Entity, PrimaryColumn } from 'typeorm'

import { UserLoginLogTable } from '@common/tables'
import { toColumnOptions, toPrimaryColumnOptions } from '@common/utils'

@Entity({ name: UserLoginLogTable.name })
export class UserLoginLogEntity {
  @PrimaryColumn(toPrimaryColumnOptions(UserLoginLogTable.userIdColumn))
  userId: string

  @Column(toColumnOptions(UserLoginLogTable.ipAddressColumn))
  ipAddress: string

  @Column(toColumnOptions(UserLoginLogTable.timestampColumn))
  timestamp: Date

  @Column(toColumnOptions(UserLoginLogTable.successColumn))
  success: boolean
}
