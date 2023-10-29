import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm'

import { OriginalSongEntity } from './original-song.entity'

import { ArtistEntity, OriginalArtistEntity } from '@features/artist/entities'
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

  @ManyToOne(() => OriginalArtistEntity)
  @JoinColumn(SongTable.originalArtistIdColumn)
  originalArtist: OriginalArtistEntity

  @ManyToOne(() => ArtistEntity, (artist) => artist.songs)
  @JoinColumn(SongTable.artistIdColumn)
  artist: ArtistEntity

  @OneToOne(() => OriginalSongEntity)
  @JoinColumn(SongTable.originalSongIdColumn)
  originalSong: OriginalSongEntity

  @ManyToMany(() => PlaylistEntity, (playlist) => playlist.songs)
  playlists: PlaylistEntity[]
}
