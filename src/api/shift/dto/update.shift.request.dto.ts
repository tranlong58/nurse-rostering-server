import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateShiftRequestDto {
  @IsNotEmpty()
  @ApiProperty({ example: 0 })
  kind: number;

  @IsNotEmpty()
  @ApiProperty({ example: 0 })
  day: number;

  @IsNotEmpty()
  @ApiProperty({ example: 2 })
  numberOfStaff: number;
}
