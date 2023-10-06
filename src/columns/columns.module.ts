import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// controllers
import { ColumnsController } from './columns.controller';
// services
import { ColumnsService } from './columns.service';
// schemas
import { Task, TaskSchema } from 'src/tasks/schema/task.schema';
import { Column, ColumnSchema } from './schema/column.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Column.name, schema: ColumnSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  controllers: [ColumnsController],
  providers: [ColumnsService],
})
export class ColumnsModule {}
