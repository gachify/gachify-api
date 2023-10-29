import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm'

import { UserLoginDataEntity } from './user-login-data.entity'

import { UserAccountTable } from '@common/tables'
import { toColumnOptions, toPrimaryColumnOptions } from '@common/utils'
import { PlaylistEntity } from '@features/playlist/entities'

@Entity({ name: UserAccountTable.name })
export class UserAccountEntity {
  @PrimaryColumn(toPrimaryColumnOptions(UserAccountTable.idColumn))
  id: string

  @Column(toColumnOptions(UserAccountTable.usernameColumn))
  username: string

  @Column(toColumnOptions(UserAccountTable.imageUrlColumn))
  imageUrl: string

  @OneToOne(() => UserLoginDataEntity, (userLoginData) => userLoginData.userAccount)
  userLoginData: UserLoginDataEntity

  @OneToMany(() => PlaylistEntity, (playlist) => playlist.userAccount)
  playlists: PlaylistEntity[]
}
