import { Table, TableColumn, TableForeignKey } from 'typeorm'

import { PlaylistTable } from './playlist.table'
import { SongTable } from './song.table'

import { UUIDType } from '@common/models'

export class PlaylistSongTable {
  static playlistIdForeignKey = new TableForeignKey({
    columnNames: ['PlaylistId'],
    referencedTableName: PlaylistTable.table.name,
    referencedColumnNames: [PlaylistTable.idColumn.name],
  })

  static playlistIdColumn = new TableColumn({
    name: 'PlaylistId',
    type: UUIDType,
    foreignKeyConstraintName: this.playlistIdForeignKey.name,
    isNullable: false,
    isUnique: true,
  })

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

  static table = new Table({
    name: 'PlaylistSong',
    columns: [this.playlistIdColumn, this.songIdColumn],
    foreignKeys: [this.songIdForeignKey, this.playlistIdForeignKey],
  })
}
