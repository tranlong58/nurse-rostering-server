import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';
import { LoginRequestDto, LoginResponseDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async convertToJwtString(id: number, email: string): Promise<string> {
    const payload = {
      id: id,
      email: email,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: process.env.JWT_EXPIRE,
      secret: process.env.JWT_SECRET,
    });
  }

  async login(data: LoginRequestDto): Promise<LoginResponseDto> {
    const admin = await this.prismaService.admin.findUnique({
      where: { email: data.email },
    });

    if (!admin || data.password !== admin.password) {
      throw new BadRequestException('wrong email or password');
    }

    return {
      token: await this.convertToJwtString(admin.id, admin.email),
      id: admin.id,
      email: admin.email,
    };
  }
}
