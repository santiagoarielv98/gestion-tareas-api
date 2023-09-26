import { Module } from '@nestjs/common';
import { SubtasksService } from './subtasks.service';
import { SubtasksController } from './subtasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubtaskSchema } from './schemas/subtask.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Subtask', schema: SubtaskSchema }])],
  controllers: [SubtasksController],
  providers: [SubtasksService],
})
export class SubtasksModule {}
