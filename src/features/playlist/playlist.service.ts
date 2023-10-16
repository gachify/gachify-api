import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import { PlaylistEntity } from './entities'
import { CreatePlaylistDto } from './dto'

import { UserEntity } from '@features/user/entities'
import { SongEntity } from '@features/song/entities'

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlistRepository: Repository<PlaylistEntity>,
    @InjectRepository(SongEntity)
    private readonly songRepository: Repository<SongEntity>,
  ) {}

  getPlaylists(user: UserEntity): Promise<PlaylistEntity[]> {
    return this.playlistRepository.find({ relations: ['songs'], where: { user: { id: user.id } } })
  }

  async createPlaylist(playlistDto: CreatePlaylistDto): Promise<PlaylistEntity> {
    const playlist = this.playlistRepository.create({ name: playlistDto.name })

    const songs = await this.songRepository.find({ where: { uuid: In(playlistDto.songIds) } })

    for (const song of songs) {
      playlist.songs.push(song)
    }

    return this.playlistRepository.save(playlist)
  }

  async searchPlaylist(playlistId: string): Promise<PlaylistEntity> {
    const playlist = await this.playlistRepository.findOne({ relations: ['songs'], where: { uuid: playlistId } })

    if (!playlist) {
      throw new NotFoundException()
    }

    return playlist
  }
}
