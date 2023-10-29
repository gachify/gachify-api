import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import { PlaylistEntity } from './entities'
import { CreatePlaylistDto } from './dto'

import { UserAccountEntity } from '@features/user/entities'
import { SongEntity } from '@features/song/entities'

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlistRepository: Repository<PlaylistEntity>,
    @InjectRepository(SongEntity)
    private readonly songRepository: Repository<SongEntity>,
  ) {}

  getPlaylists(user: UserAccountEntity): Promise<PlaylistEntity[]> {
    return this.playlistRepository.find({ relations: { songs: true }, where: { userAccount: { id: user.id } } })
  }

  createPlaylist(playlistDto: CreatePlaylistDto): Promise<PlaylistEntity> {
    const playlist = this.playlistRepository.create({ name: playlistDto.name })

    return this.playlistRepository.save(playlist)
  }

  async searchPlaylist(playlistId: string): Promise<PlaylistEntity> {
    const playlist = await this.playlistRepository.findOne({ relations: { songs: true }, where: { id: playlistId } })

    if (!playlist) {
      throw new NotFoundException()
    }

    return playlist
  }
}
