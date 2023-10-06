import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ versionKey: false })
export class Task {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: false })
  done: boolean;

  @Prop({ required: true })
  position: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Column', required: true })
  column: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subtask' }] })
  subtasks: string[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
