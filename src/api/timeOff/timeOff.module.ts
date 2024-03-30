import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { TimeOffController } from './timeOff.controller';
import { TimeOffService } from './timeOff.service';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [TimeOffController],
  providers: [TimeOffService],
})
export class TimeOffModule {}
