import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsString, Matches } from 'class-validator'

import { YOUTUBE_URL_REGEX } from '../song.constants'

export class CreateSongDto {
  @ApiProperty()
  @IsNotEmpty()
  @Matches(YOUTUBE_URL_REGEX)
  readonly youtubeUrl: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly languageId: string

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  readonly genreIds: string[]

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsArray()
  // readonly tagIds: string[]
}
