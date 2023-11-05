import { Table, TableColumn, TableForeignKey } from 'typeorm'

import { SongTable } from './song.table'
import { UserAccountTable } from './user-account.table'

import { BooleanType, UUIDType } from '@common/models'

export class SongUploadLogTable {
  static songIdForeignKey = new TableForeignKey({
    columnNames: ['SongId'],
    referencedTableName: SongTable.table.name,
    referencedColumnNames: [SongTable.idColumn.name],
  })

  static songIdColumn = new TableColumn({
    name: 'SongId',
    type: UUIDType,
    foreignKeyConstraintName: this.songIdForeignKey.name,
    isNullable: false,
  })

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

  static reviewedColumn = new TableColumn({
    name: 'Reviewed',
    type: BooleanType,
    default: false,
    isNullable: false,
  })

  static table = new Table({
    name: 'SongUploadLog',
    columns: [this.songIdColumn, this.userIdColumn, this.reviewedColumn],
    foreignKeys: [this.songIdForeignKey, this.userIdForeignKey],
  })
}
