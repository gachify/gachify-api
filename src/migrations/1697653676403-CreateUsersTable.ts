import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUsersTable1697653676403 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`create table users
    (
        id         serial,
        uuid       uuid      default uuid_generate_v4() not null,
        username   varchar                              not null,
        email      varchar,                             not null,
        hash       varchar                              not null,
        created_at timestamp default now()              not null,
        updated_at timestamp default now()              not null,
        constraint "PK_a3ffb1c0c8416b9fc6f907b7433"
            primary key (id),
        constraint "UQ_fe0bb3f6520ee0469504521e710"
            unique (username)
        constraint "UQ_fe0bb3f6520ee0469504521e711"
            unique (email)
    )`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`alter table users drop constraint PK_a3ffb1c0c8416b9fc6f907b7433`)
    await queryRunner.query(`alter table users drop constraint UQ_fe0bb3f6520ee0469504521e710`)
    await queryRunner.query(`alter table users drop constraint UQ_fe0bb3f6520ee0469504521e711`)
    await queryRunner.query(`drop table users`)
  }
}
