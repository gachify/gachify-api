import { join } from 'path'

export const MEDIA_PATH = join(process.cwd(), 'media')
export const SSL_PATH = join(process.cwd(), 'ssl')
export const SSL_KEY_PATH = join(SSL_PATH, 'gachify.club.key.pem')
export const SSL_CERT_PATH = join(SSL_PATH, 'gachify.club.crt.pem')
