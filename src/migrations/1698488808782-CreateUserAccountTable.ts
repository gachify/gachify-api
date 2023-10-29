import { MigrationInterface, QueryRunner } from 'typeorm'

import { UserAccountTable } from '@common/tables'

export class CreateUserAccountTable1698488808782 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(UserAccountTable.table)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(UserAccountTable.table)
  }
}
