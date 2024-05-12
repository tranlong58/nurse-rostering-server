import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ScheduleService } from './schedule.service';
import { AuthGuard } from '../../auth/auth.guard';
import { CreateScheduleRequestDto } from './dto';

@Controller('schedule')
@ApiTags('Schedule')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get()
  @ApiOperation({ summary: 'Get all schedule' })
  async getAllSchedule() {
    const data = await this.scheduleService.getAllSchedule();
    return { data, message: 'Success' };
  }

  @Post()
  @ApiOperation({ summary: 'Create new schedule' })
  async createShift(@Body() body: CreateScheduleRequestDto) {
    await this.scheduleService.createSchedule(body);
    return { message: 'Success' };
  }
}
