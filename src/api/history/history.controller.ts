import {
    Controller,
    Get,
    UseGuards,
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
  import { HistoryService } from './history.service';
  import { AuthGuard } from '../../auth/auth.guard';
  
  @Controller('history')
  @ApiTags('History')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  export class HistoryController {
    constructor(private historyService: HistoryService) {}
  
    @Get('')
    @ApiOperation({ summary: 'Get all history' })
    async getAllHistory() {
      const data = await this.historyService.getAllHistory();
      return { data, message: 'Success' };
    }
  
    @Get('/max')
    @ApiOperation({ summary: 'Get max date' })
    async getMaxDate() {
      const data = await this.historyService.getMaxDate();
      return { data, message: 'Success' };
    }
}
  