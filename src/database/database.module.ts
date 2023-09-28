import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Column, ColumnSchema } from 'src/columns/schemas/column.schema';
import { Subtask, SubtaskSchema } from 'src/subtasks/schemas/subtask.schema';
import { Task, TaskSchema } from 'src/tasks/schemas/task.schema';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/gestion-tareas', {}),
    MongooseModule.forFeature([
      {
        name: Column.name,
        schema: ColumnSchema,
      },
      {
        name: Task.name,
        schema: TaskSchema,
      },
      {
        name: Subtask.name,
        schema: SubtaskSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
