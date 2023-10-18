import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateArtistsTable1697654405692 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`create table artists
    (
        id         serial,
        uuid       uuid      default uuid_generate_v4() not null,
        name       varchar                              not null,
        created_at timestamp default now()              not null,
        updated_at timestamp default now()              not null,
        constraint "PK_09b823d4607d2675dc4ffa82261"
            primary key (id)
    )`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`alter table artists drop constraint PK_09b823d4607d2675dc4ffa82261`)
    await queryRunner.query(`drop table artists`)
  }
}
