import { ApiProperty } from '@nestjs/swagger'

import { SongDto } from '@features/song/dto'

export class PlaylistDto {
  @ApiProperty()
  readonly name: string

  @ApiProperty({ type: () => [SongDto] })
  readonly songs: SongDto[]
}
