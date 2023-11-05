import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm'

import { PlaybackEventTable } from '@common/tables'
import { toColumnOptions, toPrimaryColumnOptions } from '@common/utils'
import { SongEntity } from '@features/song/entities'

@Entity({ name: PlaybackEventTable.table.name })
export class PlaybackEventEntity {
  @PrimaryColumn(toPrimaryColumnOptions(PlaybackEventTable.songIdColumn))
  songId: string

  @Column(toColumnOptions(PlaybackEventTable.userIdColumn))
  userId: string

  @Column(toColumnOptions(PlaybackEventTable.timestampColumn))
  timestamp: boolean

  @ManyToMany(() => SongEntity, (song) => song.playbacks)
  @JoinTable({
    name: PlaybackEventTable.table.name,
    joinColumn: PlaybackEventTable.userIdColumn,
    inverseJoinColumn: PlaybackEventTable.songIdColumn,
  })
  songs: SongEntity[]
}
