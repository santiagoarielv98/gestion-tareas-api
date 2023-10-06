import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// controllers
import { SubtasksController } from './subtasks.controller';
// services
import { SubtasksService } from './subtasks.service';
// schemas
import { Subtask, SubtaskSchema } from './schema/subtask.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Subtask.name, schema: SubtaskSchema }])],
  controllers: [SubtasksController],
  providers: [SubtasksService],
})
export class SubtasksModule {}
