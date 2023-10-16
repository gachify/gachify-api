import { ApiProperty } from '@nestjs/swagger'

import { AbstractDto } from '@common/dto'
import { SongDto } from '@features/song/dto'

export class ArtistDto extends AbstractDto {
  @ApiProperty()
  readonly name: string

  @ApiProperty({ type: () => [SongDto] })
  readonly songs: SongDto[]
}
