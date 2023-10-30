import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SongService } from './song.service'
import { SongController } from './song.controller'
import { GenreEntity, LanguageEntity, OriginalSongEntity, SongEntity, TagEntity } from './entities'
import { YoutubeService } from './youtube.service'

import { ArtistEntity, OriginalArtistEntity } from '@features/artist/entities'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArtistEntity,
      OriginalArtistEntity,
      OriginalSongEntity,
      GenreEntity,
      LanguageEntity,
      SongEntity,
      TagEntity,
    ]),
  ],
  providers: [SongService, YoutubeService],
  controllers: [SongController],
  exports: [SongService],
})
export class SongModule {}
