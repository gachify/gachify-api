import { NestFactory, Reflector } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { fastify } from 'fastify'
import { fastifyCookie } from '@fastify/cookie'
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common'
import { readFileSync } from 'fs'
import * as https from 'https'

import { AppModule } from './app.module'
import { setupLogger } from './util/setup-logger.util'
import { SSL_CERT_PATH, SSL_KEY_PATH } from './app.constants'

import { environment } from '@environment'
import { NODE_ENV } from '@common/models'
;(async () => {
  const logger = new Logger()

  let httpsOptions: https.ServerOptions | null = null

  if (environment.NODE_ENV !== NODE_ENV.DEVELOPMENT) {
    const keyFile = readFileSync(SSL_KEY_PATH)
    const certFile = readFileSync(SSL_CERT_PATH)

    httpsOptions = {
      key: keyFile,
      cert: certFile,
    }
  }

  const fastifyInstance = fastify({
    https: httpsOptions,
    logger: {
      level: 'warn',
    },
    disableRequestLogging: true,
  })

  setupLogger(fastifyInstance)

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(fastifyInstance))

  if (environment.NODE_ENV === NODE_ENV.DEVELOPMENT) {
    import('./util/setup-swagger.util').then(({ setupSwagger }) => setupSwagger(app))
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  const reflector = app.get(Reflector)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))

  app.enableCors({
    origin: environment.UI_URL,
    credentials: true,
  })

  await app.register(fastifyCookie, { secret: environment.COOKIE_SECRET })

  await app.listen(environment.PORT, '0.0.0.0')

  logger.log(`Server started on ${environment.PORT}`)
})()
