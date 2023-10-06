import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SubtaskDocument = HydratedDocument<Subtask>;

@Schema({ versionKey: false })
export class Subtask {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ required: true })
  position: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true })
  task: string;
}

export const SubtaskSchema = SchemaFactory.createForClass(Subtask);
