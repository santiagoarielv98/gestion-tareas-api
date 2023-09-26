import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Subtask } from 'src/subtasks/schemas/subtask.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop()
  title: string;

  @Prop()
  description?: string;

  @Prop()
  done: boolean;

  @Prop()
  position: number;

  @Prop({ type: [{ type: 'ObjectId', ref: 'Subtask' }] })
  subtasks: Subtask[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
