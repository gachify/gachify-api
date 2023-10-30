import { MigrationInterface, QueryRunner } from 'typeorm'

import { SongTagTable } from '@common/tables'

export class CreateSongTagTable1000000000130 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(SongTagTable.table)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(SongTagTable.table)
  }
}
