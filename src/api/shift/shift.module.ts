import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ShiftService } from './shift.service';
import { ShiftController } from './shift.controller';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [ShiftController],
  providers: [ShiftService],
})
export class ShiftModule {}
