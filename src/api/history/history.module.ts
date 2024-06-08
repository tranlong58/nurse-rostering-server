import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
