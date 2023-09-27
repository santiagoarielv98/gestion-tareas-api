import { CreateSubtaskDto } from 'src/subtasks/dto/create-subtask.dto';

export class CreateTaskDto {
  title: string;
  description?: string;
  done: boolean;
  position: number;
  subtasks: CreateSubtaskDto[];
}
