import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import execa, { command } from 'execa'
import * as sharp from 'sharp'
import { join } from 'path'
import { readFileSync } from 'fs'

import { YoutubeVideoResponseModel } from './models'
import { YOUTUBE_URL_REGEX } from './song.constants'
import { MEDIA_PATH } from '../../app.constants'

@Injectable()
export class YoutubeService {
  private readonly logger = new Logger(YoutubeService.name)

  async download(videoCode: string, songId: string): Promise<void> {
    try {
      this.logger.debug(`Starting download of ${videoCode}`)
      await this.downloadVideo(videoCode, songId)
      this.logger.debug(`Completed download of ${videoCode}`)

      this.logger.debug(`Starting image optimization for ${songId}`)
      await this.optimizeImages(songId)
      this.logger.debug(`Completed image optimization for ${songId}`)
    } catch (error) {
      this.logger.debug(error)
      throw error
    }
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

  private downloadVideo(videoCode: string, songId: string): execa.ExecaChildProcess {
    const args = [
      this.getVideoUrl(videoCode),
      '--extract-audio',
      '--audio-format mp3',
      '--embed-metadata',
      '--embed-thumbnail',
      '--convert-thumbnails png',
      '--write-thumbnail',
      '--prefer-ffmpeg',
      `--paths ${MEDIA_PATH}`,
      `-o ${songId}`,
    ].join(' ')

    return command('yt-dlp ' + args)
  }

  private optimizeImages(songId: string): Promise<sharp.OutputInfo> {
    const sourceImagePath = join(MEDIA_PATH, `${songId}.png`)
    const targetImagePath = join(MEDIA_PATH, `${songId}_x56.png`)

    const sourceImage = readFileSync(sourceImagePath)

    return sharp(sourceImage).resize({ width: 56, height: 56, fit: 'cover' }).toFile(targetImagePath)
  }
}
