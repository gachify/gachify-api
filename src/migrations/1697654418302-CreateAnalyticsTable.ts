import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateAnalyticsTable1697654418302 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`create table analytics
    (
        id             serial,
        uuid           uuid      default uuid_generate_v4() not null,
        song_count     integer   default 0                  not null,
        total_duration integer   default 0                  not null,
        created_at     timestamp default now()              not null,
        updated_at     timestamp default now()              not null,
        user_id        integer,
        constraint "PK_3c96dcbf1e4c57ea9e0c3144bff"
            primary key (id),
        constraint "UQ_478656673247334d8cea26a2c12"
            unique (user_id),
        constraint "FK_478656673247334d8cea26a2c12"
            foreign key (user_id) references users
    )`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`alter table analytics drop constraint PK_3c96dcbf1e4c57ea9e0c3144bff`)
    await queryRunner.query(`alter table analytics drop constraint UQ_478656673247334d8cea26a2c12`)
    await queryRunner.query(`alter table analytics drop constraint FK_478656673247334d8cea26a2c12`)
    await queryRunner.query(`drop table analytics`)
  }
}
