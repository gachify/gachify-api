import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

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
  @MinLength(6)
  @ApiProperty({ minLength: 6 })
  readonly password: string

  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty()
  // readonly invitationCode: string;
}
