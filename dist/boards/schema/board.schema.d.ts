import mongoose, { HydratedDocument } from 'mongoose';
export type BoardDocument = HydratedDocument<Board>;
export declare class Board {
    name: string;
    description: string;
    position?: number;
    columns: string[];
}
export declare const BoardSchema: mongoose.Schema<Board, mongoose.Model<Board, any, any, any, mongoose.Document<unknown, any, Board> & Board & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Board, mongoose.Document<unknown, {}, mongoose.FlatRecord<Board>> & mongoose.FlatRecord<Board> & {
    _id: mongoose.Types.ObjectId;
}>;
