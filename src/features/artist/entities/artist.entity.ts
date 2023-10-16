import { Column, Entity, OneToMany } from 'typeorm'

import { AbstractEntity } from '@common/entities'
import { SongEntity } from '@features/song/entities'

@Entity({ name: 'artists' })
export class ArtistEntity extends AbstractEntity {
  @Column()
  name: string

  @OneToMany(() => SongEntity, (song) => song.artist)
  songs: SongEntity[]
}
