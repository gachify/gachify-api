import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { FastifyRequest } from 'fastify'

import { UserEntity } from '@features/user/entities'

export const CurrentUser = createParamDecorator((data: keyof UserEntity, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<FastifyRequest>()
  const user = request.user

  return data ? user?.[data] : user
})
