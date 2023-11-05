import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SongService } from './song.service'
import { SongController } from './song.controller'
import { GenreEntity, LanguageEntity, OriginalSongEntity, SongEntity, SongUploadLogEntity, TagEntity } from './entities'
import { YoutubeService } from './youtube.service'

import { ArtistEntity, OriginalArtistEntity } from '@features/artist/entities'
import { PlaybackEventEntity } from '@features/tracking/entities'

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArtistEntity,
      OriginalArtistEntity,
      OriginalSongEntity,
      GenreEntity,
      LanguageEntity,
      SongEntity,
      SongUploadLogEntity,
      TagEntity,
      PlaybackEventEntity,
    ]),
  ],
  providers: [SongService, YoutubeService],
  controllers: [SongController],
  exports: [SongService],
})
export class SongModule {}
