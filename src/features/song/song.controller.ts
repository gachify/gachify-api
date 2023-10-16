import { Body, Controller, Get, Header, HttpStatus, Param, Post, StreamableFile } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { createReadStream } from 'fs'
import { join } from 'path'

import { SongService } from './song.service'
import { CreateSongDto, SongDto } from './dto'

import { Public } from '@features/auth/decorators'

@Controller('songs')
@ApiTags('Songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get('')
  @Public()
  @Header('Content-Type', 'audio/mpeg')
  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  stream(): StreamableFile {
    const file = createReadStream(join(process.cwd(), '1d1bc5ee-2fc0-4a2c-8925-1a8e086deb52.mp3'))
    return new StreamableFile(file)
  }

  @Get('/:songId')
  @Public()
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: SongDto,
  })
  async getPlaylistById(@Param('songId') songId: string): Promise<SongDto> {
    return this.songService.searchSong(songId)
  }

  @Post()
  @Public()
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    type: SongDto,
  })
  async createPlaylist(@Body() input: CreateSongDto): Promise<SongDto> {
    return this.songService.createSong(input)
  }
}
