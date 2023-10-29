import { Table, TableColumn, TableForeignKey } from 'typeorm'

import { UserAccountTable } from './user-account.table'

import { UUIDType, NetworkAddressTypes, DateTimeTypes, DateTimeTypesGenerator, BooleanType } from '@common/models'

export class UserLoginLogTable {
  static userIdForeignKey = new TableForeignKey({
    columnNames: ['UserId'],
    referencedTableName: UserAccountTable.table.name,
    referencedColumnNames: [UserAccountTable.idColumn.name],
  })

  static userIdColumn = new TableColumn({
    name: 'UserId',
    type: UUIDType,
    foreignKeyConstraintName: this.userIdForeignKey.name,
    isNullable: false,
  })

  static ipAddressColumn = new TableColumn({
    name: 'IPAddress',
    type: NetworkAddressTypes.inet,
    isNullable: false,
  })

  static timestampColumn = new TableColumn({
    name: 'Timestamp',
    type: DateTimeTypes.timestamp,
    default: DateTimeTypesGenerator,
    isNullable: false,
  })

  static successColumn = new TableColumn({
    name: 'Success',
    type: BooleanType,
    isNullable: false,
  })

  static table = new Table({
    name: 'UserLoginLog',
    columns: [this.userIdColumn, this.ipAddressColumn, this.timestampColumn, this.successColumn],
    foreignKeys: [this.userIdForeignKey],
  })
}
