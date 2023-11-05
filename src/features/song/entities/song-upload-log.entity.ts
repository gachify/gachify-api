import { Column, Entity, PrimaryColumn } from 'typeorm'

import { SongUploadLogTable } from '@common/tables'
import { toColumnOptions, toPrimaryColumnOptions } from '@common/utils'

@Entity({ name: SongUploadLogTable.table.name })
export class SongUploadLogEntity {
  @PrimaryColumn(toPrimaryColumnOptions(SongUploadLogTable.songIdColumn))
  songId: string

  @Column(toColumnOptions(SongUploadLogTable.userIdColumn))
  userId: string

  @Column(toColumnOptions(SongUploadLogTable.reviewedColumn))
  reviewed: boolean
}
