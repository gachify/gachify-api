import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PlaylistEntity } from './entities'
import { CreatePlaylistDto, PlaylistPageDto, PlaylistPageOptionsDto } from './dto'

import { UserAccountEntity } from '@features/user/entities'
import { SongEntity } from '@features/song/entities'
import { PageMetaDto } from '@common/dto'

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlistRepository: Repository<PlaylistEntity>,
  ) {}

  async getPlaylists(user: UserAccountEntity, pageOptionsDto: PlaylistPageOptionsDto): Promise<PlaylistPageDto> {
    const [playlists, playlistCount] = await this.playlistRepository.findAndCount({
      relations: { songs: true },
      where: { userAccount: { id: user.id } },
      order: { name: 'asc' },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
    })

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: playlistCount,
    })

    return new PlaylistPageDto(playlists, pageMetaDto)
  }

  createPlaylist(user: UserAccountEntity, playlistDto: CreatePlaylistDto): Promise<PlaylistEntity> {
    const playlist = this.playlistRepository.create({ name: playlistDto.name, userId: user.id })

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
