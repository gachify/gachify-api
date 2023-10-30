import { MigrationInterface, QueryRunner } from 'typeorm'

import { UserLoginDataTable } from '@common/tables'

export class CreateUserLoginDataTable1000000000030 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(UserLoginDataTable.table)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(UserLoginDataTable.table)
  }
}
