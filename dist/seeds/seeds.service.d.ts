/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { OnApplicationBootstrap } from '@nestjs/common';
import { Model } from 'mongoose';
import { Board } from 'src/boards/schema/board.schema';
import { Column } from 'src/columns/schema/column.schema';
import { Subtask } from 'src/subtasks/schema/subtask.schema';
import { Task } from 'src/tasks/schema/task.schema';
export declare class SeedsService implements OnApplicationBootstrap {
    private boardModel;
    private columnModel;
    private taskModel;
    private subtaskModel;
    constructor(boardModel: Model<Board>, columnModel: Model<Column>, taskModel: Model<Task>, subtaskModel: Model<Subtask>);
    onApplicationBootstrap(): Promise<void>;
    seed(): Promise<void>;
    seedBoard(): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, Board> & Board & {
        _id: import("mongoose").Types.ObjectId;
    }, Omit<Board, "_id">>[]>;
    seedColumn(boardId: string): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, Column> & Column & {
        _id: import("mongoose").Types.ObjectId;
    }, Omit<Column, "_id">>[]>;
    seedTask(columnId: string): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, Task> & Task & {
        _id: import("mongoose").Types.ObjectId;
    }, Omit<Task, "_id">>[]>;
    seedSubtask(taskId: string): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, Subtask> & Subtask & {
        _id: import("mongoose").Types.ObjectId;
    }, Omit<Subtask, "_id">>[]>;
}
