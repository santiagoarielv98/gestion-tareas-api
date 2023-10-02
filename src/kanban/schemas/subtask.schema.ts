import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Task } from 'src/tasks/schemas/task.schema';

export type SubtaskDocument = HydratedDocument<Subtask>;

@Schema({ versionKey: false })
export class Subtask {
  @Prop({ required: true })
  title: string;

  @Prop({ default: false })
  done: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true })
  task: Task;
}

export const SubtaskSchema = SchemaFactory.createForClass(Subtask);
