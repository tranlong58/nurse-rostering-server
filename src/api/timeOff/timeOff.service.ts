import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTimeOffRequestDto, GetTimeOffResponseDto } from './dto';

@Injectable()
export class TimeOffService {
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

  async getAllTimeOff(): Promise<GetTimeOffResponseDto[]> {
    const timeOffs = await this.prismaService.timeOff.findMany({
      include: { staff: true, shift: true },
      orderBy: [
        { staffId: 'asc' },
        { shift: { day: 'asc' } },
        { shift: { kind: 'asc' } },
      ],
    });

    const data: GetTimeOffResponseDto[] = [];

    for (const item of timeOffs) {
      data.push({
        id: item.id,
        staffId: item.staffId,
        shiftId: item.shiftId,
        name: item.staff.name,
        day: this.DAY[item.shift.day],
        kind: this.KIND[item.shift.kind],
      });
    }

    return data;
  }

  async createTimeOff(data: CreateTimeOffRequestDto): Promise<void> {
    const timeOff = await this.prismaService.timeOff.findMany({
      where: { AND: [{ staffId: data.staffId, shiftId: data.shiftId }] },
    });

    if (timeOff.length > 0) {
      throw new BadRequestException('TimeOff already exists');
    }

    const staff = await this.prismaService.staff.findUnique({
      where: { id: data.staffId },
    });

    if (!staff) {
      throw new BadRequestException('Incorrect staff id');
    }

    const shift = await this.prismaService.shift.findUnique({
      where: { id: data.shiftId },
    });

    if (!shift) {
      throw new BadRequestException('Incorrect shift id');
    }

    await this.prismaService.timeOff.create({
      data: {
        staffId: data.staffId,
        shiftId: data.shiftId,
      },
    });
  }

  async deleteTimeOff(id: number): Promise<void> {
    const timeOff = await this.prismaService.timeOff.findUnique({
      where: { id: id },
    });

    if (!timeOff) {
      throw new BadRequestException('TimeOff does not exist');
    }

    await this.prismaService.timeOff.delete({ where: { id: id } });
  }
}
