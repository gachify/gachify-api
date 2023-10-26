import { Controller, Get, Header, HttpStatus, NotFoundException, Param, StreamableFile } from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'
import { createReadStream, existsSync } from 'fs'
import { join } from 'path'

import { MEDIA_PATH } from '../../app.constants'

@Controller('media')
@ApiTags('Media')
export class MediaController {
  @Get('/:filename')
  @Header('Cache-Control', 'public, max-age=604800')
  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  getPlaylistById(@Param('filename') filename: string): StreamableFile {
    const filePath = join(MEDIA_PATH, filename)

    if (!existsSync(filePath)) {
      throw new NotFoundException()
    }

    const file = createReadStream(filePath)
    return new StreamableFile(file)
  }
}
