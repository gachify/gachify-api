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
  Headers,
  Res,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { FastifyReply } from 'fastify'

import { SongService } from './song.service'
import { CreateSongDto, SongDto, SongsPageDto, SongsPageOptionsDto } from './dto'

import { CurrentUser } from '@features/auth/decorators'
import { UserAccountEntity } from '@features/user/entities'

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
  @Header('Accept-Ranges', 'bytes')
  @Header('Content-Type', 'audio/mpeg')
  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  stream(
    @Param('songId') songId: string,
    @Headers('range') range: string,
    @CurrentUser() currentUser: UserAccountEntity,
    @Res({ passthrough: true }) response: FastifyReply,
  ): StreamableFile {
    // this.songService.updatePlaybackCount(currentUser, songId)

    if (!range) {
      return this.songService.getAudioStreamById(songId)
    }

    const { streamableFile, contentRange } = this.songService.getPartialAudioStreamById(songId, range)

    response.status(206)
    response.setHeader('Content-Range', contentRange)

    return streamableFile
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
