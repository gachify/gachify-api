import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'

import { OriginalArtistTable } from '@common/tables'
import { toColumnOptions, toPrimaryColumnOptions } from '@common/utils'
import { OriginalSongEntity } from '@features/song/entities'

@Entity({ name: OriginalArtistTable.table.name })
export class OriginalArtistEntity {
  @PrimaryColumn(toPrimaryColumnOptions(OriginalArtistTable.idColumn))
  id: string

  @Column(toColumnOptions(OriginalArtistTable.nameColumn))
  name: string

  // @OneToMany(() => SongEntity, (songs) => songs.originalArtist)
  // songs: SongEntity[]

  @OneToMany(() => OriginalSongEntity, (songs) => songs.originalArtist)
  originalSongs: OriginalSongEntity[]
}
