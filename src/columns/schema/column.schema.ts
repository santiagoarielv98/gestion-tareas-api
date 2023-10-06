import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ColumnDocument = HydratedDocument<Column>;

@Schema({ versionKey: false })
export class Column {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({})
  position: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
  tasks: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true })
  board: string;
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
