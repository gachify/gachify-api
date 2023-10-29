import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly username: string

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string
}
