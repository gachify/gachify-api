import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller('songs')
@ApiTags('Songs')
export class SongController {}
