import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { Task } from 'src/tasks/schemas/task.schema';

export type ColumnDocument = HydratedDocument<Column>;

@Schema({ versionKey: false })
export class Column extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ required: true })
  position: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
  tasks: Task[];
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
