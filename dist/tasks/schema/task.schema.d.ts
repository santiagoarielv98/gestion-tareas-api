import mongoose, { HydratedDocument } from 'mongoose';
export type TaskDocument = HydratedDocument<Task>;
export declare class Task {
    name: string;
    description: string;
    done: boolean;
    position: number;
    column: string;
    subtasks: string[];
}
export declare const TaskSchema: mongoose.Schema<Task, mongoose.Model<Task, any, any, any, mongoose.Document<unknown, any, Task> & Task & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Task, mongoose.Document<unknown, {}, mongoose.FlatRecord<Task>> & mongoose.FlatRecord<Task> & {
    _id: mongoose.Types.ObjectId;
}>;
