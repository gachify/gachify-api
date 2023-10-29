import { Table, TableColumn, TableForeignKey } from 'typeorm'

import { OriginalArtistTable } from './original-artist.table'

import { CharacterTypes, UUIDGenerator, UUIDType } from '@common/models'

export class OriginalSongTable {
  static idColumn = new TableColumn({
    name: 'Id',
    type: UUIDType,
    default: UUIDGenerator,
    isNullable: false,
    isUnique: true,
    isPrimary: true,
  })

  static originalArtistIdForeignKey = new TableForeignKey({
    columnNames: ['OriginalArtistId'],
    referencedTableName: OriginalArtistTable.table.name,
    referencedColumnNames: [OriginalArtistTable.idColumn.name],
  })

  static originalArtistIdColumn = new TableColumn({
    name: 'OriginalArtistId',
    type: UUIDType,
    foreignKeyConstraintName: this.originalArtistIdForeignKey.name,
    isNullable: false,
    isUnique: true,
  })

  static titleColumn = new TableColumn({
    name: 'Title',
    length: '255',
    type: CharacterTypes.varchar,
    isNullable: false,
    isUnique: true,
  })

  static table = new Table({
    name: 'OriginalSong',
    columns: [this.idColumn, this.originalArtistIdColumn, this.titleColumn],
    foreignKeys: [this.originalArtistIdForeignKey],
  })
}
