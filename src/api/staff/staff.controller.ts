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
import { StaffService } from './staff.service';
import { AuthGuard } from '../../auth/auth.guard';
import { CreateStaffRequestDto, UpdateStaffRequestDto } from './dto';

@Controller('staff')
@ApiTags('Staff')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all staff' })
  async getAllStaff() {
    const data = await this.staffService.getAllStaff();
    return { data, message: 'Success' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get staff' })
  async getStaff(@Param('id') id: string) {
    const data = await this.staffService.getStaff(+id);
    return { data, message: 'Success' };
  }

  @Post()
  @ApiOperation({ summary: 'Create staff' })
  async createStaff(@Body() body: CreateStaffRequestDto) {
    const data = await this.staffService.createStaff(body);
    return { data, message: 'Success' };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update staff' })
  async updateStaff(
    @Body() body: UpdateStaffRequestDto,
    @Param('id') id: string,
  ) {
    const data = await this.staffService.updateStaff(body, +id);
    return { data, message: 'Success' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete staff' })
  async deleteStaff(@Param('id') id: string) {
    await this.staffService.deleteStaff(+id);
    return { message: 'Success' };
  }
}
