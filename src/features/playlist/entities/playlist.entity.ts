import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm'

import { AbstractEntity } from '@common/entities'
import { UserEntity } from '@features/user/entities'
import { SongEntity } from '@features/song/entities'

@Entity({ name: 'playlists' })
export class PlaylistEntity extends AbstractEntity {
  @Column()
  name: string

  @ManyToOne(() => UserEntity, (user) => user.playlists)
  user: UserEntity

  @ManyToMany(() => SongEntity)
  @JoinTable()
  songs: SongEntity[]
}
