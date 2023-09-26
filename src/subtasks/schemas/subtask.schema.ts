import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SubtaskDocument = HydratedDocument<Subtask>;

@Schema()
export class Subtask {
  @Prop()
  title: string;

  @Prop()
  done: boolean;
}

export const SubtaskSchema = SchemaFactory.createForClass(Subtask);
