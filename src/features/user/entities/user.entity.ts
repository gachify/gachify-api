import { Exclude } from 'class-transformer'
import { Column, Entity, OneToMany } from 'typeorm'

import { AbstractEntity } from '@common/entities'
import { PlaylistEntity } from '@features/playlist/entities'

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column({ unique: true })
  username: string

  @Column({ nullable: true })
  avatar: string

  @Column()
  @Exclude()
  hash: string

  @OneToMany(() => PlaylistEntity, (playlist) => playlist.user)
  playlists: PlaylistEntity[]
}
