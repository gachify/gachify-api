import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NODE_ENV } from '@common/models'
import { environment } from '@environment'
import { AuthModule } from '@features/auth'
import { UserModule } from '@features/user'

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: environment.POSTGRES_HOST,
      port: environment.POSTGRES_PORT,
      username: environment.POSTGRES_USER,
      password: environment.POSTGRES_PASSWORD,
      database: environment.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: environment.NODE_ENV === NODE_ENV.DEVELOPMENT,
      logging: environment.NODE_ENV === NODE_ENV.DEVELOPMENT,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
