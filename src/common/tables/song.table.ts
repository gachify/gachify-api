import { Table, TableColumn, TableForeignKey } from 'typeorm'

import { ArtistTable } from './artist.table'
import { OriginalSongTable } from './original-song.table'
import { OriginalArtistTable } from './original-artist.table'
import { LanguageTable } from './language.table'

import { CharacterTypes, NumericTypes, UUIDGenerator, UUIDType } from '@common/models'

// https://vertabelo.com/blog/er-diagram-movie-database/
export class SongTable {
  static idColumn = new TableColumn({
    name: 'Id',
    type: UUIDType,
    default: UUIDGenerator,
    isNullable: false,
    isUnique: true,
    isPrimary: true,
  })

  static artistIdForeignKey = new TableForeignKey({
    columnNames: ['ArtistId'],
    referencedTableName: ArtistTable.table.name,
    referencedColumnNames: [ArtistTable.idColumn.name],
  })

  static artistIdColumn = new TableColumn({
    name: 'ArtistId',
    type: UUIDType,
    foreignKeyConstraintName: this.artistIdForeignKey.name,
    isNullable: false,
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
    isNullable: true,
  })

  static originalSongIdForeignKey = new TableForeignKey({
    columnNames: ['OriginalSongId'],
    referencedTableName: OriginalSongTable.table.name,
    referencedColumnNames: [OriginalSongTable.idColumn.name],
  })

  static originalSongIdColumn = new TableColumn({
    name: 'OriginalSongId',
    type: UUIDType,
    foreignKeyConstraintName: this.originalSongIdForeignKey.name,
    isNullable: true,
  })

  static languageIdForeignKey = new TableForeignKey({
    columnNames: ['LanguageId'],
    referencedTableName: LanguageTable.table.name,
    referencedColumnNames: [LanguageTable.idColumn.name],
  })

  static languageIdColumn = new TableColumn({
    name: 'LanguageId',
    type: UUIDType,
    foreignKeyConstraintName: this.languageIdForeignKey.name,
    isNullable: false,
  })

  static titleColumn = new TableColumn({
    name: 'Title',
    length: '255',
    type: CharacterTypes.varchar,
    isNullable: false,
    isUnique: true,
  })

  // @todo Check if needs separate table
  // https://developer.amazon.com/docs/music/API_web_schema.html#imagetype
  static imageUrlColumn = new TableColumn({
    name: 'ImageUrl',
    length: '255',
    type: CharacterTypes.varchar,
    isNullable: true,
  })

  static durationColumn = new TableColumn({
    name: 'Duration',
    type: NumericTypes.smallint,
    isNullable: false,
  })

  static youtubeUrlColumn = new TableColumn({
    name: 'YoutubeUrl',
    length: '255',
    type: CharacterTypes.varchar,
    isNullable: true,
  })

  static table = new Table({
    name: 'Song',
    columns: [
      this.idColumn,
      this.artistIdColumn,
      this.originalArtistIdColumn,
      this.originalSongIdColumn,
      this.languageIdColumn,
      this.titleColumn,
      this.imageUrlColumn,
      this.durationColumn,
      this.youtubeUrlColumn,
    ],
    foreignKeys: [
      this.artistIdForeignKey,
      this.originalArtistIdForeignKey,
      this.originalSongIdForeignKey,
      this.languageIdForeignKey,
    ],
  })
}
