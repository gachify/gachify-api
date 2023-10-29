import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserLoginLogEntity } from '../entities'

@Injectable()
export class UserLoginLogService {
  constructor(
    @InjectRepository(UserLoginLogEntity)
    private readonly userLoginLogRepository: Repository<UserLoginLogEntity>,
  ) {}

  trackLoginAttempt(attempt: { userId: string; ipAddress: string; success: boolean }): Promise<UserLoginLogEntity> {
    const userLoginLog = this.userLoginLogRepository.create(attempt)
    return this.userLoginLogRepository.save(userLoginLog)
  }
}
