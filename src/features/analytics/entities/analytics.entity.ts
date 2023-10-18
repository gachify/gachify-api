import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'

import { AbstractEntity } from '@common/entities'
import { UserEntity } from '@features/user/entities'

@Entity({ name: 'analytics' })
export class AnalyticsEntity extends AbstractEntity {
  @Column('int', { default: 0 })
  songCount: number

  @Column('int', { default: 0 })
  totalDuration: number

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity
}
