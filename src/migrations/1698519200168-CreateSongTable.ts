import { MigrationInterface, QueryRunner } from 'typeorm'

import { SongTable } from '@common/tables'

export class CreateSongTable1698519200168 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(SongTable.table)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(SongTable.table)
  }
}
