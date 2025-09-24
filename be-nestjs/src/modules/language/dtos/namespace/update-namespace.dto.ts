import { PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

import { CreateNamespaceDto } from './create-namespace.dto';

export class UpdateNamespaceDto extends PartialType(CreateNamespaceDto) {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
