import { Column, Entity, ManyToOne } from 'typeorm'

import { AbstractEntity } from '@common/entities'
import { ArtistEntity } from '@features/artist/entities'

@Entity({ name: 'songs' })
export class SongEntity extends AbstractEntity {
  @Column()
  name: string

  @Column('int')
  duration: number

  @Column({ name: 'playback_count', type: 'int', default: 0 })
  playbackCount: number

  @ManyToOne(() => ArtistEntity, (artist) => artist.songs)
  artist: ArtistEntity
}
