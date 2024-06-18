import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetHistoryResponseDto, GetMaxDateResponseDto } from './dto';

@Injectable()
export class HistoryService {
  constructor(private prismaService: PrismaService) {}

  async getAllHistory(): Promise<GetHistoryResponseDto[]> {
    return this.prismaService.history.findMany({
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        start: true,
        end: true,
      },
    });
  }

  async getMaxDate(): Promise<GetMaxDateResponseDto> {
    const history = await this.prismaService.history.findFirst({
        orderBy: {
          id: 'desc',
        },
    });

    if (!history) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return {
        maxDate: yesterday,
      };
    }

    return {
      maxDate: history.end,
    };
  }
}
