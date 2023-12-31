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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ColumnsService } from './columns.service';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
export declare class ColumnsController {
    private readonly columnsService;
    constructor(columnsService: ColumnsService);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schema/column.schema").Column> & import("./schema/column.schema").Column & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/column.schema").Column> & import("./schema/column.schema").Column & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateColumnDto: UpdateColumnDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/column.schema").Column> & import("./schema/column.schema").Column & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/column.schema").Column> & import("./schema/column.schema").Column & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createTask(columnId: string, createTaskDto: CreateTaskDto | CreateTaskDto[]): Promise<import("mongoose").Document<unknown, {}, import("./schema/column.schema").Column> & import("./schema/column.schema").Column & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
