import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  GetStaffResponseDto,
  CreateStaffRequestDto,
  CreateStaffResponseDto,
  UpdateStaffRequestDto,
} from './dto';

@Injectable()
export class StaffService {
  constructor(private prismaService: PrismaService) {}

  async getAllStaff(): Promise<GetStaffResponseDto[]> {
    return this.prismaService.staff.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async getStaff(id: number): Promise<GetStaffResponseDto> {
    const staff = await this.prismaService.staff.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
      },
    });

    if (!staff) {
      throw new BadRequestException('Staff does not exist');
    }

    return staff;
  }

  async createStaff(
    data: CreateStaffRequestDto,
  ): Promise<CreateStaffResponseDto> {
    const staff = await this.prismaService.staff.findUnique({
      where: { id: data.id },
    });

    if (staff) {
      throw new BadRequestException('ID already exists');
    }

    return this.prismaService.staff.create({
      data: {
        id: data.id,
        name: data.name,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async updateStaff(
    data: UpdateStaffRequestDto,
    id: number,
  ): Promise<CreateStaffResponseDto> {
    const staff = await this.prismaService.staff.findUnique({
      where: { id: id },
    });

    if (!staff) {
      throw new BadRequestException('Staff does not exist');
    }

    const isIdExist = await this.prismaService.staff.findUnique({
      where: { id: data.id },
    });

    if (staff.id !== data.id && isIdExist) {
      throw new BadRequestException('ID already exists');
    }

    return this.prismaService.staff.update({
      where: {
        id: id,
      },
      data: {
        id: data.id,
        name: data.name,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async deleteStaff(id: number): Promise<void> {
    const staff = await this.prismaService.staff.findUnique({
      where: { id: id },
    });

    if (!staff) {
      throw new BadRequestException('Shift does not exist');
    }

    await this.prismaService.schedule.deleteMany({ where: { staffId: id } });

    await this.prismaService.staff.delete({ where: { id: id } });
  }
}
