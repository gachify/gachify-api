import { MigrationInterface, QueryRunner } from 'typeorm'

import { GenreTable } from '@common/tables'
import { GenreEntity } from '@features/song/entities'

export class CreateGenreTable1000000000140 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(GenreTable.table)

    const genres = [
      'Blues',
      'Country music',
      'Classical music',
      'Electronic',
      'Folk',
      'Reggae',
      'Hip Hop',
      'Jazz',
      'Pop music',
      'Funk',
      'R&B',
      'Rock',
      'Metal',
      'Punk',
    ]
    const genreEntities = genres.map((name) => queryRunner.manager.create(GenreEntity, { name }))
    queryRunner.manager.save(genreEntities)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(GenreTable.table)
  }
}
