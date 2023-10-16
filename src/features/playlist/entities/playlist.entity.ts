import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import { Exclude } from 'class-transformer'

import { AbstractEntity } from '@common/entities'
import { UserEntity } from '@features/user/entities'
import { SongEntity } from '@features/song/entities'

@Entity({ name: 'playlists' })
export class PlaylistEntity extends AbstractEntity {
  @Column()
  name: string

  @Exclude()
  @ManyToOne(() => UserEntity, (user) => user.playlists)
  user: UserEntity

  @ManyToMany(() => SongEntity)
  @JoinTable()
  songs: SongEntity[]
}
