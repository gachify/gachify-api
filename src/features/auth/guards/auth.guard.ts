import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { Reflector } from '@nestjs/core'

import { AuthService } from '../auth.service'
import { IS_PUBLIC_KEY } from '../decorators'
import { SESSION_COOKIE } from '../session-cookie.constant'

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
    const token = this.extractTokenFromCookies(request)

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

  private extractTokenFromCookies(request: FastifyRequest): string | undefined {
    if (request.cookies[SESSION_COOKIE]) {
      const result = request.unsignCookie(request.cookies[SESSION_COOKIE])
      if (result.valid) {
        return result.value || ''
      }
    }
  }
}
