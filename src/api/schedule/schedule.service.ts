import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateScheduleRequestDto, GetScheduleResponseDto } from './dto';

@Injectable()
export class ScheduleService {
  constructor(private prismaService: PrismaService) {}

  private KIND: string[] = ['Morning', 'Afternoon', 'Evening', 'Night'];
  private DAY: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  async getAllSchedule(): Promise<GetScheduleResponseDto[]> {
    const schedules = await this.prismaService.schedule.findMany({
      include: { staff: true },
    });

    const data: GetScheduleResponseDto[] = [];

    for (const item of schedules) {
      data.push({
        id: item.id,
        staffId: item.staffId,
        date: item.date,
        name: item.staff.name,
        shiftKind: this.KIND[item.shiftKind],
      });
    }

    return data;
  }

  async createSchedule(data: CreateScheduleRequestDto): Promise<void> {
    await this.prismaService.schedule.deleteMany({});

    const totalStaff = data.schedule.length;
    const scheduleLength = data.length;
    const startDate = new Date(data.startDate);

    for (let i = 0; i < totalStaff; i++) {
      for (let j = 0; j < scheduleLength; j++) {
        if (data.schedule[i].shiftList[j] === -1) continue;

        const newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() + j);

        await this.prismaService.schedule.create({
          data: {
            date: newDate,
            staffId: data.schedule[i].staffId,
            shiftKind: data.schedule[i].shiftList[j],
          }
        })
      }
    }

    return;
  }
}
