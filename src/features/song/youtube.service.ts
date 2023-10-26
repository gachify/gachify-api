import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { command } from 'execa'

import { YoutubeVideoResponseModel } from './models'
import { YOUTUBE_URL_REGEX } from './song.constants'

@Injectable()
export class YoutubeService {
  private readonly logger = new Logger(YoutubeService.name)

  async download(videoCode: string, songId: string): Promise<void> {
    this.logger.debug(`Starting download of ${videoCode}`)

    const args = [
      this.getVideoUrl(videoCode),
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

    this.logger.debug(`Completed download of ${videoCode}`)
  }

  async getInfo(videoCode: string): Promise<YoutubeVideoResponseModel> {
    this.logger.debug(`Getting information about ${videoCode}`)

    const args = [this.getVideoUrl(videoCode), '--skip-download', '-J'].join(' ')
    const { stdout } = await command('yt-dlp ' + args)

    this.logger.debug(`Retrieved information about ${videoCode}`)

    const response: YoutubeVideoResponseModel = JSON.parse(stdout)

    response.title = this.convertToUtf8(response.title)
    response.description = this.convertToUtf8(response.description)
    response.fulltitle = this.convertToUtf8(response.fulltitle)

    return response
  }

  getVideoCode(youtubeUrl: string): string {
    const match = youtubeUrl.match(YOUTUBE_URL_REGEX)
    if (match?.[1].length == 11) {
      return match[1]
    }

    throw new BadRequestException()
  }

  private getVideoUrl(videoCode: string): string {
    return `https://youtu.be/${videoCode}`
  }

  private convertToUtf8(input: string): string {
    return Buffer.from(input, 'utf-8').toString()
  }
}
