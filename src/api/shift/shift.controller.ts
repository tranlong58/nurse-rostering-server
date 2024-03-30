import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ShiftService } from './shift.service';
import { AuthGuard } from '../../auth/auth.guard';
import { CreateShiftRequestDto, UpdateShiftRequestDto } from './dto';

@Controller('shift')
@ApiTags('Shift')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ShiftController {
  constructor(private shiftService: ShiftService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all shift' })
  async getAllShift() {
    const data = await this.shiftService.getAllShift();
    return { data, message: 'Success' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get shift' })
  async getShift(@Param('id') id: string) {
    const data = await this.shiftService.getShift(+id);
    return { data, message: 'Success' };
  }

  @Post()
  @ApiOperation({ summary: 'Create shift' })
  async createShift(@Body() body: CreateShiftRequestDto) {
    const data = await this.shiftService.createShift(body);
    return { data, message: 'Success' };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update shift' })
  async updateShift(
    @Body() body: UpdateShiftRequestDto,
    @Param('id') id: string,
  ) {
    const data = await this.shiftService.updateShift(body, +id);
    return { data, message: 'Success' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete shift' })
  async deleteShift(@Param('id') id: string) {
    await this.shiftService.deleteShift(+id);
    return { message: 'Success' };
  }
}
