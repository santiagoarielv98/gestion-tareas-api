import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Task } from 'src/tasks/schemas/task.schema';

export type ColumnDocument = HydratedDocument<Column>;

@Schema()
export class Column {
  @Prop()
  title: string;

  @Prop()
  description?: string;

  @Prop()
  position: number;

  @Prop({ type: [{ type: 'ObjectId', ref: 'Task' }] })
  tasks: Task[];
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
