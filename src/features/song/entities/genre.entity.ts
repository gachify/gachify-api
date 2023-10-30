import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm'

import { SongEntity } from './song.entity'

import { GenreTable, SongGenreTable } from '@common/tables'
import { toColumnOptions, toPrimaryColumnOptions } from '@common/utils'

@Entity({ name: GenreTable.table.name })
export class GenreEntity {
  @PrimaryColumn(toPrimaryColumnOptions(GenreTable.idColumn))
  id: string

  @Column(toColumnOptions(GenreTable.nameColumn))
  name: string

  @ManyToMany(() => SongEntity, (song) => song.tags)
  @JoinTable({
    name: SongGenreTable.table.name,
    joinColumn: SongGenreTable.genreIdColumn,
    inverseJoinColumn: SongGenreTable.songIdColumn,
  })
  songs: SongEntity[]
}
