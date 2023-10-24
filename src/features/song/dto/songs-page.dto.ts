import { ApiProperty } from '@nestjs/swagger'

import { SongDto } from './song.dto'

import { PageMetaDto } from '@common/dto'

export class SongsPageDto {
  @ApiProperty({
    type: () => SongDto,
    isArray: true,
  })
  readonly data: SongDto[]

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto

  constructor(data: SongDto[], meta: PageMetaDto) {
    this.data = data
    this.meta = meta
  }
}
