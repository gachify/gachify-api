import { ApiProperty } from '@nestjs/swagger'

import { OriginalSongDto } from './original-song.dto'

import { ArtistDto, OriginalArtistDto } from '@features/artist/dto'

export class SongDto {
  @ApiProperty()
  readonly id: string

  @ApiProperty({ type: () => Number })
  readonly duration: number

  @ApiProperty()
  readonly title: string

  @ApiProperty()
  readonly imageUrl: string

  @ApiProperty({ type: () => OriginalArtistDto })
  readonly originalArtist: OriginalArtistDto

  @ApiProperty({ type: () => ArtistDto })
  readonly artist: ArtistDto

  @ApiProperty({ type: () => OriginalSongDto })
  readonly originalSong: OriginalSongDto
}
