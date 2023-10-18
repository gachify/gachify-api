import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NODE_ENV } from '@common/models'
import { environment } from '@environment'
import { AuthModule } from '@features/auth'
import { UserModule } from '@features/user'
import { PlaylistModule } from '@features/playlist'
import { SongModule } from '@features/song'
import { ArtistModule } from '@features/artist'
import { AnalyticsModule } from '@features/analytics'
import { SnakeNamingStrategy } from '@common/strategies'

@Module({
  imports: [
    AuthModule,
    ArtistModule,
    AnalyticsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: environment.POSTGRES_HOST,
      port: environment.POSTGRES_PORT,
      username: environment.POSTGRES_USER,
      password: environment.POSTGRES_PASSWORD,
      database: environment.POSTGRES_DB,
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
      // synchronize: environment.NODE_ENV === NODE_ENV.DEVELOPMENT,
      migrationsRun: true,
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      logging: environment.NODE_ENV === NODE_ENV.DEVELOPMENT,
    }),
    UserModule,
    PlaylistModule,
    SongModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
