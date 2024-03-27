import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequestDto, LoginResponseDto } from './dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  async login(@Body() body: LoginRequestDto) {
    const data = await this.authService.login(body);

    return { data, message: 'Success' };
  }
}
