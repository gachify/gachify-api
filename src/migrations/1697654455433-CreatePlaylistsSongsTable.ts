import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreatePlaylistsSongsTable1697654455433 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`create table playlists_songs_songs
    (
        playlists_id integer not null,
        songs_id     integer not null,
        constraint "PK_6db20a86f353d57e232188872b3"
            primary key (playlists_id, songs_id),
        constraint "FK_a7419a79549846b01acbe9a6bed"
            foreign key (playlists_id) references playlists
                on update cascade on delete cascade,
        constraint "FK_5d5e20b2df403802d8970f6e04b"
            foreign key (songs_id) references songs
                on update cascade on delete cascade
    )`)
    await queryRunner.query(`create index "IDX_a7419a79549846b01acbe9a6be" on playlists_songs_songs (playlists_id)`)
    await queryRunner.query(`create index "IDX_5d5e20b2df403802d8970f6e04" on playlists_songs_songs (songs_id)`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`alter table playlists_songs_songs drop index IDX_a7419a79549846b01acbe9a6be`)
    await queryRunner.query(`alter table playlists_songs_songs drop index IDX_5d5e20b2df403802d8970f6e04`)
    await queryRunner.query(`alter table playlists_songs_songs drop constraint FK_a7419a79549846b01acbe9a6bed`)
    await queryRunner.query(`alter table playlists_songs_songs drop constraint FK_5d5e20b2df403802d8970f6e04b`)
    await queryRunner.query(`drop table playlists_songs_songs`)
  }
}
