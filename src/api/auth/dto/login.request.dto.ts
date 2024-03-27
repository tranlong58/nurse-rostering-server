import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'long.tt194102@sis.hust.edu.vn' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: '123123' })
  password: string;
}
