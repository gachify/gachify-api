import { MigrationInterface, QueryRunner } from 'typeorm'

import { SongGenreTable } from '@common/tables'

export class CreateGenreTable1000000000150 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(SongGenreTable.table)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(SongGenreTable.table)
  }
}
