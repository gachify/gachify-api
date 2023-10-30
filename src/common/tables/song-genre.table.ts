import { Table, TableColumn, TableForeignKey } from 'typeorm'

import { SongTable } from './song.table'
import { GenreTable } from './genre.table'

import { UUIDType } from '@common/models'

export class SongGenreTable {
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

  static genreIdForeignKey = new TableForeignKey({
    columnNames: ['GenreId'],
    referencedTableName: GenreTable.table.name,
    referencedColumnNames: [GenreTable.idColumn.name],
  })

  static genreIdColumn = new TableColumn({
    name: 'GenreId',
    type: UUIDType,
    foreignKeyConstraintName: this.genreIdForeignKey.name,
    isNullable: false,
  })

  static table = new Table({
    name: 'SongGenre',
    columns: [this.songIdColumn, this.genreIdColumn],
    foreignKeys: [this.songIdForeignKey, this.genreIdForeignKey],
  })
}
