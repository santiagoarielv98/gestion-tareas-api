import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Column } from 'src/columns/schemas/column.schema';
import { Subtask } from 'src/subtasks/schemas/subtask.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ versionKey: false })
export class Task extends mongoose.Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ default: false })
  done: boolean;

  @Prop()
  position: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subtask' }] })
  subtasks: Subtask[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Column', required: true })
  column: Column;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
