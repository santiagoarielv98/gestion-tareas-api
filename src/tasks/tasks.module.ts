import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// services
import { TasksService } from './tasks.service';
// controllers
import { TasksController } from './tasks.controller';
// schemas
import { Subtask, SubtaskSchema } from 'src/subtasks/schema/subtask.schema';
import { Task, TaskSchema } from './schema/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: Subtask.name, schema: SubtaskSchema },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [MongooseModule],
})
export class TasksModule {}
