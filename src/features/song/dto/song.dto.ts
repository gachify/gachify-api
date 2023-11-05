import { ApiProperty } from '@nestjs/swagger'

import { OriginalSongDto } from './original-song.dto'
import { TagDto } from './tag.dto'
import { GenreDto } from './genre.dto'
import { LanguageDto } from './language.dto'

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

  // @ApiProperty({ type: () => OriginalArtistDto })
  // readonly originalArtist: OriginalArtistDto

  // @ApiProperty({ type: () => OriginalSongDto })
  // readonly originalSong: OriginalSongDto

  @ApiProperty({ type: () => ArtistDto })
  readonly artist: ArtistDto

  @ApiProperty({ type: () => LanguageDto })
  readonly language?: LanguageDto

  @ApiProperty({ type: () => [TagDto] })
  readonly tags: TagDto[]

  @ApiProperty({ type: () => [GenreDto] })
  readonly genres: GenreDto[]
}
