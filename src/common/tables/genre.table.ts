import { Table, TableColumn } from 'typeorm'

import { CharacterTypes, UUIDGenerator, UUIDType } from '@common/models'

export class GenreTable {
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

  static table = new Table({
    name: 'Genre',
    columns: [this.idColumn, this.nameColumn],
  })
}
