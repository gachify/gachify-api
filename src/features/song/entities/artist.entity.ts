import { Column, Entity, OneToMany } from 'typeorm'

import { SongEntity } from './song.entity'

import { AbstractEntity } from '@common/entities'

@Entity({ name: 'artists' })
export class ArtistEntity extends AbstractEntity {
  @Column()
  name: string

  @OneToMany(() => SongEntity, (song) => song.artist)
  songs: SongEntity[]
}
