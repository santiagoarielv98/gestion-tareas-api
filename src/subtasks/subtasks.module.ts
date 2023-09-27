import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/tasks/schemas/task.schema';
import { Subtask, SubtaskSchema } from './schemas/subtask.schema';
import { SubtasksController } from './subtasks.controller';
import { SubtasksService } from './subtasks.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subtask.name, schema: SubtaskSchema },
      {
        name: Task.name,
        schema: TaskSchema,
      },
    ]),
  ],
  controllers: [SubtasksController],
  providers: [SubtasksService],
})
export class SubtasksModule {}
