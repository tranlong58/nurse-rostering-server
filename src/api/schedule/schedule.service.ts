import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateScheduleRequestDto, GetScheduleResponseDto, GetScheduleTodayResponseDto, GetStatisticResponseDto, ScheduleType } from './dto';
@Injectable()
export class ScheduleService {
  constructor(private prismaService: PrismaService) {}

  async getSchedule(historyId: number): Promise<GetScheduleResponseDto> {
    const schedules = await this.prismaService.schedule.findMany({
      where: { historyId: historyId },
      include: { staff: true, history: true },
    });

    if (schedules.length === 0) {
      throw new BadRequestException('Schedule does not exist');
    }

    const listDate: Date[] = [];

    for (const schedule of schedules) {
      const index = listDate.findIndex(
        (date) => date.getTime() === schedule.date.getTime(),
      );

      if (index === -1) {
        listDate.push(schedule.date);
      }
    }

    listDate.sort((a, b) => a.getTime() - b.getTime());

    const data: ScheduleType[] = [];

    for (const date of listDate) {
      const obj: ScheduleType = {
        id: date,
        date: date,
        detail: [[], [], [], []],
      };

      for (const schedule of schedules) {
        if (date.getTime() === schedule.date.getTime()) {
          obj.detail[schedule.shiftKind].push({
            name: schedule.staff.name,
            staffId: schedule.staffId,
          })
        }
      }

      data.push(obj)
    }

    return {
      startDate: schedules[0].history.start,
      endDate: schedules[0].history.end,
      schedules: data,
    };
  }

  async getScheduleToday(): Promise<GetScheduleTodayResponseDto> {
    const today = new Date();
    const todayIndex = today.getDay() === 0 ? 6 : today.getDay()-1;

    if(today.getUTCHours() >= 17) {
      today.setUTCHours(17, 0, 0, 0);
    }
    else {
      today.setUTCHours(17, 0, 0, 0);
      today.setUTCDate(today.getUTCDate() - 1);
    }

    const scheduleToday = await this.prismaService.schedule.findMany({
      where: {date: today},
      include: {staff: true},
    })

    const detail = [[], [], [], []];
    for (const schedule of scheduleToday) { 
      detail[schedule.shiftKind].push({
        name: schedule.staff.name,
        staffId: schedule.staffId,
      })
    }

    const shiftToday = await this.prismaService.shift.findMany({
      where: {day: todayIndex}
    })

    const listMaxStaff = [0, 0, 0, 0];

    shiftToday.forEach((item) => {
      listMaxStaff[item.kind] = item.numberOfStaff
    })

    return {
      detail,
      listMaxStaff,
      id: [0, 1, 2, 3],
    };
  }

  async createSchedule(data: CreateScheduleRequestDto): Promise<void> {
    const totalStaff = data.schedule.length;
    const scheduleLength = data.length;
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.startDate);
    endDate.setDate(startDate.getDate() + scheduleLength - 1);
    
    const newHistory = await this.prismaService.history.create({
      data: {
        start: startDate,
        end: endDate,
      },
      select: {
        id: true,
      }
    });

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
            historyId: newHistory.id,
          },
        });
      }
    }

    return;
  }

  async updateSchedule(historyId: number, data: CreateScheduleRequestDto): Promise<void> {
    const totalStaff = data.schedule.length;
    const scheduleLength = data.length;
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.startDate);
    endDate.setDate(startDate.getDate() + scheduleLength - 1);

    await this.prismaService.schedule.deleteMany({
      where: {
        historyId,
      }
    })

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
            historyId: historyId,
          },
        });
      }
    }

    return;
  }

  async getStatistic(): Promise<GetStatisticResponseDto[]> {
    const res: GetStatisticResponseDto[] = []

    const staffs = await this.prismaService.staff.findMany();
    const schedules = await this.prismaService.schedule.findMany();
    const today = new Date();
    if(today.getUTCHours() >= 17) {
      today.setUTCHours(17, 0, 0, 0);
    }
    else {
      today.setUTCHours(17, 0, 0, 0);
      today.setUTCDate(today.getUTCDate() - 1);
    }
    
    for(let i=0; i<staffs.length; i++) {
      const obj = {
        staffId: staffs[i].id,
        staffName: staffs[i].name,
        completed: [0, 0, 0, 0],
        total: [0, 0, 0, 0],
      }

      for(let j=0; j<schedules.length; j++) {
        if(schedules[j].staffId === staffs[i].id) {
          obj.total[schedules[j].shiftKind]++;

          if(schedules[j].date < today) {
            obj.completed[schedules[j].shiftKind]++;
          }
        }
      }

      res.push(obj)
    }

    return res;
  }
}
