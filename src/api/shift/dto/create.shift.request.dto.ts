import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShiftRequestDto {
  @IsNotEmpty()
  @ApiProperty({ example: 0 })
  kind: number;

  @IsNotEmpty()
  @ApiProperty({ example: 2 })
  date: number;

  @IsNotEmpty()
  @ApiProperty({ example: 3 })
  numberOfStaff: number;
}
