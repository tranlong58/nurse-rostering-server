import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

type ScheduleType = {
  staffId: number;
  shiftList: number[];
};

export class CreateScheduleRequestDto {
  @IsNotEmpty()
  @ApiProperty({ example: 7 })
  length: number;

  @IsNotEmpty()
  @ApiProperty({ example: '08/05/2024' })
  startDate: Date;

  @IsNotEmpty()
  @ApiProperty({
    example: [{ staffId: 2507, shiftList: [-1, -1, -1, -1, -1, -1, -1] }],
  })
  schedule: ScheduleType[];
}
