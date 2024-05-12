import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './api/auth/auth.module';
import { StaffModule } from './api/staff/staff.module';
import { ShiftModule } from './api/shift/shift.module';
import { TimeOffModule } from './api/timeOff/timeOff.module';
import { ScheduleModule } from './api/schedule/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    PrismaModule,
    JwtModule,
    AuthModule,
    StaffModule,
    ShiftModule,
    TimeOffModule,
    ScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
