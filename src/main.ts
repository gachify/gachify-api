import { NestFactory, Reflector } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import fastify from 'fastify'
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'
import { setupLogger } from './util/setup-logger.util'

import { environment } from '@environment'
import { NODE_ENV } from '@common/models'
;(async () => {
  const logger = new Logger()

  const fastifyInstance = fastify({
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

  await app.listen(environment.PORT)
  logger.log(`Server started on port ${environment.PORT}`)
})()
