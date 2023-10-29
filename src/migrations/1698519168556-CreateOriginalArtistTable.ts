import { MigrationInterface, QueryRunner } from 'typeorm'

import { OriginalArtistTable } from '@common/tables'

export class CreateOriginalArtistTable1698519168556 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(OriginalArtistTable.table)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(OriginalArtistTable.table)
  }
}
