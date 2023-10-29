import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm'

import { SongEntity } from '@features/song/entities'
import { PlaylistSongTable, PlaylistTable } from '@common/tables'
import { toColumnOptions, toPrimaryColumnOptions } from '@common/utils'
import { UserAccountEntity } from '@features/user/entities'

@Entity({ name: PlaylistTable.table.name })
export class PlaylistEntity {
  @PrimaryColumn(toPrimaryColumnOptions(PlaylistTable.idColumn))
  id: string

  @Column(toColumnOptions(PlaylistTable.nameColumn))
  name: string

  @Column(toColumnOptions(PlaylistTable.imageUrlColumn))
  imageUrl: string

  @ManyToOne(() => UserAccountEntity, (user) => user.playlists)
  @JoinColumn(PlaylistTable.userIdColumn)
  userAccount: UserAccountEntity

  @ManyToMany(() => SongEntity, (song) => song.playlists)
  @JoinTable({
    name: PlaylistSongTable.table.name,
    joinColumn: PlaylistSongTable.playlistIdColumn,
    inverseJoinColumn: PlaylistSongTable.songIdColumn,
  })
  songs: SongEntity[]
}
