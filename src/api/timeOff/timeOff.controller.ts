import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TimeOffService } from './timeOff.service';
import { AuthGuard } from '../../auth/auth.guard';
import { CreateTimeOffRequestDto, GetTimeOffResponseDto } from './dto';

@Controller('time-off')
@ApiTags('Time off')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class TimeOffController {
  constructor(private timeOffService: TimeOffService) {}

  @Get()
  @ApiOperation({ summary: 'Get all time off' })
  async getAllTimeOff() {
    const data = await this.timeOffService.getAllTimeOff();
    return { data, message: 'Success' };
  }

  @Post()
  @ApiOperation({ summary: 'Create time off' })
  async createTimeOff(@Body() body: CreateTimeOffRequestDto) {
    await this.timeOffService.createTimeOff(body);
    return { message: 'Success' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete time off' })
  async deleteTimeOff(@Param('id') id: string) {
    await this.timeOffService.deleteTimeOff(+id);
    return { message: 'Success' };
  }
}
