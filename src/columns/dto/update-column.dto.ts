import { PartialType } from '@nestjs/mapped-types';
import { CreateColumnDto } from './create-column.dto';

export class UpdateColumnDto extends PartialType(CreateColumnDto) {}

export class UpdateColumnPositionDto {
  source: {
    droppableId: string;
    index: number;
  };
  destination: {
    droppableId: string;
    index: number;
  };
}
