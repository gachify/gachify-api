import { MigrationInterface, QueryRunner } from 'typeorm'

import { LanguageTable } from '@common/tables'
import { LanguageEntity } from '@features/song/entities'

export class CreateLanguageTable1000000000080 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(LanguageTable.table)

    const languages = ['Russian', 'English', 'Japanese']
    const languageEntities = languages.map((name) => queryRunner.manager.create(LanguageEntity, { name }))
    queryRunner.manager.save(languageEntities)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(LanguageTable.table)
  }
}
