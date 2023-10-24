import {
  Body,
  Controller,
  Get,
  Header,
  HttpStatus,
  Param,
  Post,
  Query,
  StreamableFile,
  ValidationPipe,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { SongService } from './song.service'
import { CreateSongDto, SongDto, SongsPageDto, SongsPageOptionsDto } from './dto'

import { CurrentUser } from '@features/auth/decorators'
import { UserEntity } from '@features/user/entities'

@Controller('songs')
@ApiTags('Songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get('')
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: SongsPageDto,
  })
  songs(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: SongsPageOptionsDto,
  ): Promise<SongsPageDto> {
    return this.songService.getSongs(pageOptionsDto)
  }

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
  getSongById(@Param('songId') songId: string): Promise<SongDto> {
    return this.songService.searchSong(songId)
  }

  @Get('/popular')
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: [SongDto],
  })
  getPopularSongs(): Promise<SongDto[]> {
    return this.songService.popularSongs()
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
