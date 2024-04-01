import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTimeOffRequestDto {
  @IsNotEmpty()
  @ApiProperty({ example: 4102 })
  staffId: number;

  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  shiftId: number;
}
