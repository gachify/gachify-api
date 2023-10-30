import { MigrationInterface, QueryRunner } from 'typeorm'

import { TagTable } from '@common/tables'

export class CreateTagTable1000000000120 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(TagTable.table)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TagTable.table)
  }
}
