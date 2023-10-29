import { Table, TableColumn } from 'typeorm'

import { CharacterTypes, UUIDGenerator, UUIDType } from '@common/models'

// https://vertabelo.com/blog/user-authentication-module/
export class UserAccountTable {
  static idColumn = new TableColumn({
    name: 'Id',
    type: UUIDType,
    default: UUIDGenerator,
    isNullable: false,
    isUnique: true,
    isPrimary: true,
  })

  static usernameColumn = new TableColumn({
    name: 'Username',
    length: '255',
    type: CharacterTypes.varchar,
    isNullable: false,
    isUnique: true,
  })

  static imageUrlColumn = new TableColumn({
    name: 'ImageUrl',
    length: '255',
    type: CharacterTypes.varchar,
    isNullable: true,
  })

  static table = new Table({
    name: 'UserAccount',
    columns: [this.idColumn, this.usernameColumn, this.imageUrlColumn],
  })
}
