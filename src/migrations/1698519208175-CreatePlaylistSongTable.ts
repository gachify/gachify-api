import { MigrationInterface, QueryRunner } from 'typeorm'

import { PlaylistSongTable } from '@common/tables'

export class CreatePlaylistSongTable1698519208175 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(PlaylistSongTable.table)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(PlaylistSongTable.table)
  }
}
