import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller('playlists')
@ApiTags('Playlists')
export class PlaylistController {}
