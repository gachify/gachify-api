import { Injectable, Logger } from '@nestjs/common'
import { command } from 'execa'

import { YoutubeVideoResponseModel } from './models'

@Injectable()
export class YoutubeService {
  private readonly logger = new Logger(YoutubeService.name)

  async download(youtubeUrl: string, songId: string): Promise<void> {
    this.logger.debug(`Starting download of ${youtubeUrl}`)

    const args = [
      youtubeUrl,
      '--extract-audio',
      '--audio-format mp3',
      '--embed-metadata',
      '--embed-thumbnail',
      '--convert-thumbnails png',
      '--write-thumbnail',
      '--prefer-ffmpeg',
      `--paths ./media`,
      `-o ${songId}`,
    ].join(' ')

    try {
      await command('yt-dlp ' + args)
    } catch (error) {
      this.logger.debug(error)
      throw error
    }

    this.logger.debug(`Completed download of ${youtubeUrl}`)
  }

  async getInfo(youtubeUrl: string): Promise<YoutubeVideoResponseModel> {
    this.logger.debug(`Getting information about ${youtubeUrl}`)

    const args = [youtubeUrl, '--skip-download', '-J'].join(' ')
    const { stdout } = await command('yt-dlp ' + args)

    this.logger.debug(`Retrieved information about ${youtubeUrl}`)

    const response: YoutubeVideoResponseModel = JSON.parse(stdout)

    response.title = this.convertToUtf8(response.title)
    response.description = this.convertToUtf8(response.description)
    response.fulltitle = this.convertToUtf8(response.fulltitle)

    return response
  }

  private convertToUtf8(input: string): string {
    return Buffer.from(input, 'utf-8').toString()
  }
}
