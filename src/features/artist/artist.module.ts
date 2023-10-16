import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ArtistEntity } from './entities'
import { ArtistService } from './artist.service'
import { ArtistController } from './artist.controller'

import { SongEntity } from '@features/song/entities'

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity, SongEntity])],
  providers: [ArtistService],
  controllers: [ArtistController],
  exports: [ArtistService],
})
export class ArtistModule {}
