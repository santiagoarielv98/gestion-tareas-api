import mongoose, { HydratedDocument } from 'mongoose';
export type SubtaskDocument = HydratedDocument<Subtask>;
export declare class Subtask {
    name: string;
    description: string;
    position: number;
    task: string;
}
export declare const SubtaskSchema: mongoose.Schema<Subtask, mongoose.Model<Subtask, any, any, any, mongoose.Document<unknown, any, Subtask> & Subtask & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Subtask, mongoose.Document<unknown, {}, mongoose.FlatRecord<Subtask>> & mongoose.FlatRecord<Subtask> & {
    _id: mongoose.Types.ObjectId;
}>;
