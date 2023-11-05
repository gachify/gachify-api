import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ArtistEntity, OriginalArtistEntity } from './entities'
import { ArtistService } from './artist.service'
import { ArtistController } from './artist.controller'

import { SongEntity } from '@features/song/entities'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity, OriginalArtistEntity, SongEntity])],
  providers: [ArtistService],
  controllers: [ArtistController],
  exports: [ArtistService],
})
export class ArtistModule {}
