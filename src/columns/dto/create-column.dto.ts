import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';

export class CreateColumnDto {
  _id: string;
  title: string;
  description?: string;
  position: number;
  tasks: CreateTaskDto[];
}
