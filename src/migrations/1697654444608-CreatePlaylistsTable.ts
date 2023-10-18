import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreatePlaylistsTable1697654444608 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`create table playlists
    (
        id         serial,
        uuid       uuid      default uuid_generate_v4() not null,
        name       varchar                              not null,
        created_at timestamp default now()              not null,
        updated_at timestamp default now()              not null,
        user_id    integer,
        constraint "PK_a4597f4189a75d20507f3f7ef0d"
            primary key (id),
        constraint "FK_a3ea169575c25e5c55494d7f382"
            foreign key (user_id) references users
    )`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`alter table playlists drop constraint PK_a4597f4189a75d20507f3f7ef0d`)
    await queryRunner.query(`alter table playlists drop constraint FK_a3ea169575c25e5c55494d7f382`)
    await queryRunner.query(`drop table playlists`)
  }
}
