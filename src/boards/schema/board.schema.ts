import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type BoardDocument = HydratedDocument<Board>;

@Schema({ versionKey: false })
export class Board {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({})
  position?: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Column' }] })
  columns: string[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);

BoardSchema.pre('save', function (next) {
  if (!this.isNew) return next();
  (this.constructor as mongoose.Model<Board>)
    .countDocuments()
    .then((count) => {
      console.log(count);
      this.position = count;
      next();
    })
    .catch((err) => next(err));
});

BoardSchema.pre('insertMany', function (next, docs) {
  this.countDocuments()
    .then((count) => {
      docs.forEach((doc, i) => {
        doc.position = count + i;
      });
      next();
    })
    .catch((err) => next(err));
});
