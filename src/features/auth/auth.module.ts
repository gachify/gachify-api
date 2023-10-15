import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthGuard } from './guards'

import { environment } from '@environment'
import { UserModule } from '@features/user'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: environment.JWT_TOKEN_SECRET,
      signOptions: { expiresIn: `${environment.JWT_TOKEN_EXPIRATION_TIME}s` },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
