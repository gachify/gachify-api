import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm'

import { SongEntity } from './song.entity'

import { OriginalArtistEntity } from '@features/artist/entities'
import { OriginalSongTable } from '@common/tables'
import { toColumnOptions, toPrimaryColumnOptions } from '@common/utils'

@Entity({ name: OriginalSongTable.table.name })
export class OriginalSongEntity {
  @PrimaryColumn(toPrimaryColumnOptions(OriginalSongTable.idColumn))
  id: string

  @Column(toColumnOptions(OriginalSongTable.titleColumn))
  title: string

  @OneToMany(() => SongEntity, (songs) => songs.artist)
  songs: SongEntity[]

  @OneToOne(() => OriginalArtistEntity)
  @JoinColumn(OriginalSongTable.originalArtistIdColumn)
  originalArtist: OriginalArtistEntity
}
