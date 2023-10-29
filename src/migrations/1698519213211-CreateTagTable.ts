import { MigrationInterface, QueryRunner } from 'typeorm'

import { TagTable } from '@common/tables'

export class CreateTagTable1698519213211 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(TagTable.table)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TagTable.table)
  }
}
