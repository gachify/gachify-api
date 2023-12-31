import { config } from 'dotenv'

import { NODE_ENV } from '@common/models'

config()

interface Environment {
  UI_URL: string
  PORT: number
  NODE_ENV: NODE_ENV
  // Database
  POSTGRES_HOST: string
  POSTGRES_PORT: number
  POSTGRES_USER: string
  POSTGRES_PASSWORD: string
  POSTGRES_DB: string
  // Security
  COOKIE_SECRET: string
  JWT_TOKEN_SECRET: string
  JWT_TOKEN_EXPIRATION_TIME: number
  USER_PASSWORD_BCRYPT_SALT_ROUNDS: number
}

export const environment: Environment = {
  UI_URL: String(process.env.UI_URL),
  PORT: Number(process.env.PORT),
  NODE_ENV: process.env.NODE_ENV as NODE_ENV,
  POSTGRES_HOST: String(process.env.POSTGRES_HOST),
  POSTGRES_PORT: Number(process.env.POSTGRES_PORT),
  POSTGRES_USER: String(process.env.POSTGRES_USER),
  POSTGRES_PASSWORD: String(process.env.POSTGRES_PASSWORD),
  POSTGRES_DB: String(process.env.POSTGRES_DB),
  COOKIE_SECRET: String(process.env.COOKIE_SECRET),
  JWT_TOKEN_SECRET: String(process.env.JWT_TOKEN_SECRET),
  JWT_TOKEN_EXPIRATION_TIME: Number(process.env.JWT_TOKEN_EXPIRATION_TIME),
  USER_PASSWORD_BCRYPT_SALT_ROUNDS: Number(process.env.USER_PASSWORD_BCRYPT_SALT_ROUNDS),
}
