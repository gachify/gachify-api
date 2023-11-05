import { MigrationInterface, QueryRunner } from 'typeorm'

import { SongUploadLogTable } from '@common/tables'

export class CreateSongUploadLogTable1000000000160 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(SongUploadLogTable.table)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(SongUploadLogTable.table)
  }
}
