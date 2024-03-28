import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
