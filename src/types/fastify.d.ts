import { UserEntity } from '@features/user/entities'
import 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    user?: UserEntity
    res: FastifyReply
  }

  export interface FastifyReply {
    startTime: number
    setHeader: (key: string, value: string) => unknown
    end: () => void
  }
}
