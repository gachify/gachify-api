import { Table, TableColumn, TableForeignKey } from 'typeorm'

import { UserAccountTable } from './user-account.table'

import { CharacterTypes, UUIDGenerator, UUIDType } from '@common/models'

export class PlaylistTable {
  static idColumn = new TableColumn({
    name: 'Id',
    type: UUIDType,
    default: UUIDGenerator,
    isNullable: false,
    isUnique: true,
    isPrimary: true,
  })

  static nameColumn = new TableColumn({
    name: 'Name',
    length: '255',
    type: CharacterTypes.varchar,
    isNullable: false,
    isUnique: true,
  })

  // @todo Check if needs separate table
  static imageUrlColumn = new TableColumn({
    name: 'ImageUrl',
    length: '255',
    type: CharacterTypes.varchar,
    isNullable: true,
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
    isPrimary: true,
    isNullable: false,
    isUnique: true,
  })

  static table = new Table({
    name: 'Playlist',
    columns: [this.idColumn, this.nameColumn, this.imageUrlColumn, this.userIdColumn],
    foreignKeys: [this.userIdForeignKey],
  })
}
