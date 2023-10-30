import { MigrationInterface, QueryRunner } from 'typeorm'

import { OriginalArtistTable } from '@common/tables'

export class CreateOriginalArtistTable1000000000050 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(OriginalArtistTable.table)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(OriginalArtistTable.table)
  }
}
