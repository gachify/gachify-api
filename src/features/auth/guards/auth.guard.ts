import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { Reflector } from '@nestjs/core'

import { AuthService } from '../auth.service'
import { IS_PUBLIC_KEY } from '../decorators'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      // 💡 See this condition
      return true
    }

    const request = context.switchToHttp().getRequest<FastifyRequest>()
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const user = await this.authService.getUserFromToken(token)

      if (!user) {
        return false
      }

      request.user = user
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromHeader(request: FastifyRequest): string | undefined {
    const [type, token] = (request.headers.authorization || '').split(' ')

    return type === 'Bearer' ? token : undefined
  }
}
