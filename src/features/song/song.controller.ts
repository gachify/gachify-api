import { Body, Controller, Get, Header, HttpStatus, Param, Post, StreamableFile } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { SongService } from './song.service'
import { CreateSongDto, SongDto } from './dto'

import { CurrentUser } from '@features/auth/decorators'
import { UserEntity } from '@features/user/entities'

@Controller('songs')
@ApiTags('Songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get('/:songId/stream')
  @Header('Content-Type', 'audio/mpeg')
  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  stream(@Param('songId') songId: string, @CurrentUser() currentUser: UserEntity): Promise<StreamableFile> {
    return this.songService.streamSong(currentUser, songId)
  }

  @Get('/:songId')
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: SongDto,
  })
  getPlaylistById(@Param('songId') songId: string): Promise<SongDto> {
    return this.songService.searchSong(songId)
  }

  @Post()
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    type: SongDto,
  })
  createPlaylist(@Body() input: CreateSongDto): Promise<SongDto> {
    return this.songService.createSong(input)
  }
}
