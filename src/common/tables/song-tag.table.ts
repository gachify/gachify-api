import { Table, TableColumn, TableForeignKey } from 'typeorm'

import { SongTable } from './song.table'
import { TagTable } from './tag.table'

import { UUIDType } from '@common/models'

export class SongTagTable {
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
    isUnique: true,
  })

  static tagIdForeignKey = new TableForeignKey({
    columnNames: ['TagId'],
    referencedTableName: TagTable.table.name,
    referencedColumnNames: [TagTable.idColumn.name],
  })

  static tagIdColumn = new TableColumn({
    name: 'TagId',
    type: UUIDType,
    foreignKeyConstraintName: this.tagIdForeignKey.name,
    isNullable: false,
    isUnique: true,
  })

  static table = new Table({
    name: 'SongTag',
    columns: [this.songIdColumn, this.tagIdColumn],
    foreignKeys: [this.tagIdForeignKey, this.songIdForeignKey],
  })
}
