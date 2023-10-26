export interface YoutubeVideoResponseModel {
  id: string
  title: string
  thumbnail: string
  description: string
  channel_id: string
  channel_url: string
  duration: number
  view_count: number
  age_limit: number
  webpage_url: string
  channel: string
  channel_follower_count: number
  uploader: string
  uploader_id: string
  uploader_url: string
  tags?: string[]
  upload_date: string // 20200518
  fulltitle: string
}
