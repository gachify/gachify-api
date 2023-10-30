import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'

import { SongEntity } from './song.entity'

import { LanguageTable } from '@common/tables'
import { toColumnOptions, toPrimaryColumnOptions } from '@common/utils'

@Entity({ name: LanguageTable.table.name })
export class LanguageEntity {
  @PrimaryColumn(toPrimaryColumnOptions(LanguageTable.idColumn))
  id: string

  @Column(toColumnOptions(LanguageTable.nameColumn))
  name: string

  @OneToMany(() => SongEntity, (song) => song.language)
  songs: SongEntity[]
}
