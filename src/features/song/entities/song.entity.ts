import { Column, Entity, ManyToOne } from 'typeorm'

import { ArtistEntity } from './artist.entity'

import { AbstractEntity } from '@common/entities'

@Entity({ name: 'songs' })
export class SongEntity extends AbstractEntity {
  @Column()
  name: string

  @Column('int')
  duration: number

  @Column('int')
  playbackCount: number

  @Column('int')
  likingCount: number

  @ManyToOne(() => ArtistEntity, (artist) => artist.songs)
  artist: ArtistEntity
}
