import { Table, TableColumn } from 'typeorm'

import { CharacterTypes, UUIDGenerator, UUIDType } from '@common/models'

export class ArtistTable {
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

  static youtubeUrlColumn = new TableColumn({
    name: 'YoutubeUrl',
    length: '255',
    type: CharacterTypes.varchar,
    isNullable: true,
  })

  static table = new Table({
    name: 'Artist',
    columns: [this.idColumn, this.nameColumn, this.imageUrlColumn, this.youtubeUrlColumn],
  })
}
