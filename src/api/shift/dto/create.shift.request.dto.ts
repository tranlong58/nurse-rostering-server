import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShiftRequestDto {
  @IsNotEmpty()
  @ApiProperty({ example: 2 })
  day: number;

  @IsNotEmpty()
  @ApiProperty({ example: [3, 2, 6, 6] })
  numberOfStaff: number[];
}
