import { ApiProperty } from '@nestjs/swagger'

import { PageOptionsDto } from './page-options.dto'

interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto
  itemCount: number
}

export class PageMetaDto {
  @ApiProperty()
  readonly page: number

  @ApiProperty()
  readonly take: number

  @ApiProperty()
  readonly itemCount: number

  @ApiProperty()
  readonly pageCount: number

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page
    this.take = pageOptionsDto.take
    this.itemCount = itemCount
    this.pageCount = Math.ceil(itemCount / this.take)
  }
}
