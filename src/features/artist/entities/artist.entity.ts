import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { Exclude } from 'class-transformer'

import { ArtistTable } from '@common/tables'
import { toColumnOptions, toPrimaryColumnOptions } from '@common/utils'
import { SongEntity } from '@features/song/entities'

@Entity({ name: ArtistTable.table.name })
export class ArtistEntity {
  @PrimaryColumn(toPrimaryColumnOptions(ArtistTable.idColumn))
  id: string

  @Column(toColumnOptions(ArtistTable.nameColumn))
  name: string

  @Column(toColumnOptions(ArtistTable.imageUrlColumn))
  imageUrl?: string

  @Exclude()
  @Column(toColumnOptions(ArtistTable.youtubeUrlColumn))
  youtubeUrl?: string

  @OneToMany(() => SongEntity, (songs) => songs.artist)
  songs: SongEntity[]
}
