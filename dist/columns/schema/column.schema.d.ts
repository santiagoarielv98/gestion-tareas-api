import mongoose, { HydratedDocument } from 'mongoose';
export type ColumnDocument = HydratedDocument<Column>;
export declare class Column {
    name: string;
    description: string;
    position: number;
    tasks: string[];
    board: string;
}
export declare const ColumnSchema: mongoose.Schema<Column, mongoose.Model<Column, any, any, any, mongoose.Document<unknown, any, Column> & Column & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Column, mongoose.Document<unknown, {}, mongoose.FlatRecord<Column>> & mongoose.FlatRecord<Column> & {
    _id: mongoose.Types.ObjectId;
}>;
