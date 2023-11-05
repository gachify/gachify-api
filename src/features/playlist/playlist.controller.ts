import { Body, Controller, Get, HttpStatus, Param, Post, Query, ValidationPipe } from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger'

import { CreatePlaylistDto, PlaylistDto, PlaylistPageDto, PlaylistPageOptionsDto } from './dto'
import { PlaylistService } from './playlist.service'

import { CurrentUser } from '@features/auth/decorators'
import { UserAccountEntity } from '@features/user/entities'

@Controller('playlists')
@ApiTags('Playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get('/my')
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: PlaylistPageDto,
  })
  userPlaylists(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PlaylistPageOptionsDto,
    @CurrentUser() user: UserAccountEntity,
  ): Promise<PlaylistPageDto> {
    return this.playlistService.getPlaylists(user, { page: 1, take: 50, skip: 0 })
  }

  @Get('/:playlistId')
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: PlaylistDto,
  })
  getPlaylistById(@Param('playlistId') playlistId: string): Promise<PlaylistDto> {
    return this.playlistService.searchPlaylist(playlistId)
  }

  @Post()
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    type: PlaylistDto,
  })
  createPlaylist(@CurrentUser() user: UserAccountEntity, @Body() input: CreatePlaylistDto): Promise<PlaylistDto> {
    return this.playlistService.createPlaylist(user, input)
  }
}
