import { MigrationInterface, QueryRunner } from 'typeorm'

import { PlaylistTable } from '@common/tables'

export class CreatePlaylistTable1000000000100 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(PlaylistTable.table)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(PlaylistTable.table)
  }
}
