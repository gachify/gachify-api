import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger'

import { ArtistService } from './artist.service'
import { ArtistDto, CreateArtistDto } from './dto'

@Controller('artists')
@ApiTags('Artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get('/:artistId')
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: ArtistDto,
  })
  async getPlaylistById(@Param('artistId') artistId: string): Promise<ArtistDto> {
    return this.artistService.findById(artistId)
  }

  @Post()
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    type: ArtistDto,
  })
  async createPlaylist(@Body() input: CreateArtistDto): Promise<ArtistDto> {
    return this.artistService.createArtist(input)
  }
}
