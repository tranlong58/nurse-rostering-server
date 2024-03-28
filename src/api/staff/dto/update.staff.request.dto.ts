import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStaffRequestDto {
  @IsNotEmpty()
  @ApiProperty({ example: 20194102 })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ example: 'Tran Thanh Long' })
  name: string;
}
