import { ApiProperty } from '@nestjs/swagger'

import { AbstractDto } from '@common/dto'
import { ArtistDto } from '@features/artist/dto'

export class SongDto extends AbstractDto {
  @ApiProperty()
  readonly name: string

  @ApiProperty({ type: () => Number })
  readonly duration: number

  @ApiProperty({ type: () => Number })
  readonly playbackCount: number

  @ApiProperty({ type: () => ArtistDto })
  readonly artist: ArtistDto
}
