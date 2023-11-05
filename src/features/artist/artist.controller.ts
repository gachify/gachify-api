import { Controller, Get, HttpStatus, Param, Query, ValidationPipe } from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'

import { ArtistService } from './artist.service'
import { ArtistDto } from './dto'

import { SongService } from '@features/song/song.service'
import { SongsPageDto, SongsPageOptionsDto } from '@features/song/dto'

@Controller('artists')
@ApiTags('Artists')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly songService: SongService,
  ) {}

  @Get('/:artistId')
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: ArtistDto,
  })
  async getArtistById(@Param('artistId') artistId: string): Promise<ArtistDto> {
    return this.artistService.findById(artistId)
  }

  @Get('/:artistId/songs')
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: ArtistDto,
  })
  async getPlaylistById(
    @Param('artistId') artistId: string,
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: SongsPageOptionsDto,
  ): Promise<SongsPageDto> {
    return this.songService.getSongsByArtistId(artistId, pageOptionsDto)
  }
}
