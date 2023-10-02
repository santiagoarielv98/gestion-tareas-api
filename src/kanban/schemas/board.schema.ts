import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { Column } from './column.schema';

export type BoardDocument = HydratedDocument<Board>;

@Schema({ versionKey: false })
export class Board extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  position: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Column' }] })
  columns: Column[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
