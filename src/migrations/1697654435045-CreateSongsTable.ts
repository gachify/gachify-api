import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateSongsTable1697654435045 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`create table songs
    (
        id             serial,
        uuid           uuid      default uuid_generate_v4() not null,
        name           varchar                              not null,
        duration       integer                              not null,
        playback_count integer   default 0                  not null,
        created_at     timestamp default now()              not null,
        updated_at     timestamp default now()              not null,
        artist_id      integer,
        constraint "PK_e504ce8ad2e291d3a1d8f1ea2f4"
            primary key (id),
        constraint "FK_999ba7dd3c94dd5f9649944a5c6"
            foreign key (artist_id) references artists
    )`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`alter table songs drop constraint PK_e504ce8ad2e291d3a1d8f1ea2f4`)
    await queryRunner.query(`alter table songs drop constraint FK_999ba7dd3c94dd5f9649944a5c6`)
    await queryRunner.query(`drop table songs`)
  }
}
