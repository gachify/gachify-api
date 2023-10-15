import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly username: string

  @IsString()
  @MinLength(6)
  @ApiProperty({ minLength: 6 })
  readonly password: string

  @IsString()
  @ApiProperty({ required: false })
  readonly avatar?: string

  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty()
  // readonly invitationCode: string;
}
