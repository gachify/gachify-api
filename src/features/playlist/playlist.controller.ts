import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger'

import { CreatePlaylistDto, PlaylistDto } from './dto'
import { PlaylistService } from './playlist.service'

import { CurrentUser } from '@features/auth/decorators'
import { UserEntity } from '@features/user/entities'

@Controller('playlists')
@ApiTags('Playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get('/my')
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: [PlaylistDto],
  })
  async userPlaylists(@CurrentUser() user: UserEntity): Promise<PlaylistDto[]> {
    return this.playlistService.getPlaylists(user)
  }

  @Get('/:playlistId')
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: PlaylistDto,
  })
  async getPlaylistById(@Param('playlistId') playlistId: string): Promise<PlaylistDto> {
    return this.playlistService.searchPlaylist(playlistId)
  }

  @Post()
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    type: PlaylistDto,
  })
  async createPlaylist(@Body() input: CreatePlaylistDto): Promise<PlaylistDto> {
    return this.playlistService.createPlaylist(input)
  }
}
