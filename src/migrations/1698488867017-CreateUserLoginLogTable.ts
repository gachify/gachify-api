import { MigrationInterface, QueryRunner } from 'typeorm'

import { UserLoginLogTable } from '@common/tables'

export class CreateUserLoginLogTable1698488867017 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(UserLoginLogTable.table)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(UserLoginLogTable.table)
  }
}
