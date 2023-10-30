import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm'

import { SongEntity } from './song.entity'

import { SongTagTable, TagTable } from '@common/tables'
import { toColumnOptions, toPrimaryColumnOptions } from '@common/utils'

@Entity({ name: TagTable.table.name })
export class TagEntity {
  @PrimaryColumn(toPrimaryColumnOptions(TagTable.idColumn))
  id: string

  @Column(toColumnOptions(TagTable.nameColumn))
  name: string

  @ManyToMany(() => SongEntity, (song) => song.tags)
  @JoinTable({
    name: SongTagTable.table.name,
    joinColumn: SongTagTable.tagIdColumn,
    inverseJoinColumn: SongTagTable.songIdColumn,
  })
  songs: SongEntity[]
}
