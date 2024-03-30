import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  GetShiftResponseDto,
  CreateShiftRequestDto,
  CreateShiftResponseDto,
  UpdateShiftRequestDto,
} from './dto';

@Injectable()
export class ShiftService {
  constructor(private prismaService: PrismaService) {}

  private KIND: string[] = ['Morning', 'Afternoon', 'Evening', 'Night'];
  private DATE: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  async getAllShift(): Promise<GetShiftResponseDto[]> {
    const listShift = await this.prismaService.shift.findMany({
      select: {
        id: true,
        kind: true,
        date: true,
        numberOfStaff: true,
      },
      orderBy: [
        {
          date: 'asc',
        },
        {
          kind: 'asc',
        },
      ],
    });

    const data: GetShiftResponseDto[] = [];

    for (const shift of listShift) {
      data.push({
        id: shift.id,
        kind: this.KIND[shift.kind],
        date: this.DATE[shift.date],
        numberOfStaff: shift.numberOfStaff,
      });
    }

    return data;
  }

  async getShift(id: number): Promise<GetShiftResponseDto> {
    const shift = await this.prismaService.shift.findUnique({
      where: { id: id },
      select: {
        id: true,
        kind: true,
        date: true,
        numberOfStaff: true,
      },
    });

    if (!shift) {
      throw new BadRequestException('Shift does not exist');
    }

    return {
      id: shift.id,
      kind: this.KIND[shift.kind],
      date: this.DATE[shift.date],
      numberOfStaff: shift.numberOfStaff,
    };
  }

  async createShift(
    data: CreateShiftRequestDto,
  ): Promise<CreateShiftResponseDto> {
    const shift = await this.prismaService.shift.findMany({
      where: { AND: [{ kind: data.kind, date: data.date }] },
    });

    if (shift.length > 0) {
      throw new BadRequestException('Shift already exists');
    }

    const newShift = await this.prismaService.shift.create({
      data: {
        kind: data.kind,
        date: data.date,
        numberOfStaff: data.numberOfStaff,
      },
      select: {
        id: true,
        kind: true,
        date: true,
        numberOfStaff: true,
      },
    });

    return {
      id: newShift.id,
      kind: this.KIND[newShift.kind],
      date: this.DATE[newShift.date],
      numberOfStaff: newShift.numberOfStaff,
    };
  }

  async updateShift(
    data: UpdateShiftRequestDto,
    id: number,
  ): Promise<CreateShiftResponseDto> {
    const shift = await this.prismaService.shift.findUnique({
      where: { id: id },
    });

    if (!shift) {
      throw new BadRequestException('Shift does not exist');
    }

    const isKindDateExist = await this.prismaService.shift.findMany({
      where: { AND: [{ kind: data.kind, date: data.date }] },
    });

    if (
      (shift.date !== data.date || shift.kind !== data.kind) &&
      isKindDateExist.length > 0
    ) {
      throw new BadRequestException('New kind-date already exists');
    }

    const newShift = await this.prismaService.shift.update({
      where: {
        id: id,
      },
      data: {
        kind: data.kind,
        date: data.date,
        numberOfStaff: data.numberOfStaff,
      },
      select: {
        id: true,
        kind: true,
        date: true,
        numberOfStaff: true,
      },
    });

    return {
      id: newShift.id,
      kind: this.KIND[newShift.kind],
      date: this.DATE[newShift.date],
      numberOfStaff: newShift.numberOfStaff,
    };
  }

  async deleteShift(id: number): Promise<void> {
    const shift = await this.prismaService.shift.findUnique({
      where: { id: id },
    });

    if (!shift) {
      throw new BadRequestException('Shift does not exist');
    }

    await this.prismaService.timeOff.deleteMany({ where: { shiftId: id } });

    await this.prismaService.schedule.deleteMany({ where: { shiftId: id } });

    await this.prismaService.shift.delete({ where: { id: id } });
  }
}
