import { MigrationInterface, QueryRunner } from 'typeorm'

import { PlaybackEventTable } from '@common/tables'

export class CreatePlaybackEventTable1000000000170 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(PlaybackEventTable.table)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(PlaybackEventTable.table)
  }
}
