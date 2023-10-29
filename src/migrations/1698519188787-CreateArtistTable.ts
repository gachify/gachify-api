import { MigrationInterface, QueryRunner } from 'typeorm'

import { ArtistTable } from '@common/tables'

export class CreateArtistTable1698519188787 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(ArtistTable.table)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(ArtistTable.table)
  }
}
