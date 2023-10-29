import { MigrationInterface, QueryRunner } from 'typeorm'

import { OriginalSongTable } from '@common/tables'

export class CreateOriginalSongTable1698519176715 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(OriginalSongTable.table)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(OriginalSongTable.table)
  }
}
