import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { FastifyRequest } from 'fastify'

import { UserAccountEntity } from '@features/user/entities'

export const CurrentUser = createParamDecorator((data: keyof UserAccountEntity, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<FastifyRequest>()
  const user = request.user

  return data ? user?.[data] : user
})
