import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Task } from 'src/tasks/schemas/task.schema';

export type SubtaskDocument = HydratedDocument<Subtask>;

@Schema()
export class Subtask {
  @Prop()
  title: string;

  @Prop()
  done: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true })
  task: Task;
}

export const SubtaskSchema = SchemaFactory.createForClass(Subtask);
