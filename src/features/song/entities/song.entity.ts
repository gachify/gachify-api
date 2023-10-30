import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm'

import { TagEntity } from './tag.entity'
import { LanguageEntity } from './language.entity'
import { GenreEntity } from './genre.entity'

import { ArtistEntity } from '@features/artist/entities'
import { SongTable } from '@common/tables'
import { toColumnOptions, toPrimaryColumnOptions } from '@common/utils'
import { PlaylistEntity } from '@features/playlist/entities'

@Entity({ name: SongTable.table.name })
export class SongEntity {
  @PrimaryColumn(toPrimaryColumnOptions(SongTable.idColumn))
  id: string

  @Column(toColumnOptions(SongTable.durationColumn))
  duration: number

  @Column(toColumnOptions(SongTable.titleColumn))
  title: string

  @Column(toColumnOptions(SongTable.imageUrlColumn))
  imageUrl: string

  @Column(toColumnOptions(SongTable.youtubeUrlColumn))
  youtubeUrl: string

  // @ManyToOne(() => OriginalArtistEntity)
  // @JoinColumn(SongTable.originalArtistIdColumn)
  // originalArtist?: OriginalArtistEntity

  // @OneToOne(() => OriginalSongEntity)
  // @JoinColumn(SongTable.originalSongIdColumn)
  // originalSong?: OriginalSongEntity

  @ManyToOne(() => LanguageEntity)
  @JoinColumn(SongTable.languageIdColumn)
  language: LanguageEntity

  @ManyToMany(() => TagEntity, (tag) => tag.songs)
  tags: TagEntity[]

  @ManyToMany(() => GenreEntity, (genre) => genre.songs)
  genres: GenreEntity[]

  @ManyToOne(() => ArtistEntity, (artist) => artist.songs)
  @JoinColumn(SongTable.artistIdColumn)
  artist: ArtistEntity

  @ManyToMany(() => PlaylistEntity, (playlist) => playlist.songs)
  playlists: PlaylistEntity[]
}
