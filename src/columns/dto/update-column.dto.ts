import { PartialType } from '@nestjs/mapped-types';
import { CreateColumnDto } from './create-column.dto';

export class UpdateColumnDto extends PartialType(CreateColumnDto) {}

export class UpdateColumnPositionDto {
  source: {
    index: number;
  };
  destination: {
    index: number;
  };
}
