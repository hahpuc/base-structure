import { PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

import { CreateWardDto } from './create-ward.dto';

export class UpdateWardDto extends PartialType(CreateWardDto) {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
