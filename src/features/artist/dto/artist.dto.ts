import { ApiProperty } from '@nestjs/swagger'

import { SongDto } from '@features/song/dto'

export class ArtistDto {
  @ApiProperty()
  readonly id: string

  @ApiProperty()
  readonly name: string

  @ApiProperty()
  readonly imageUrl?: string

  @ApiProperty()
  readonly youtubeUrl?: string

  @ApiProperty({ type: () => [SongDto] })
  readonly songs: SongDto[]
}
