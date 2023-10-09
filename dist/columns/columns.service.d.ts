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
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Task } from 'src/tasks/schema/task.schema';
import { Column } from './schema/column.schema';
export declare class ColumnsService {
    private columnModel;
    private taskModel;
    constructor(columnModel: Model<Column>, taskModel: Model<Task>);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Column> & Column & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Column> & Column & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateColumnDto: UpdateColumnDto): Promise<import("mongoose").Document<unknown, {}, Column> & Column & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, Column> & Column & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createTask(id: string, createTaskDto: CreateTaskDto | CreateTaskDto[]): Promise<import("mongoose").Document<unknown, {}, Column> & Column & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
