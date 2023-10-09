"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ColumnsService = class ColumnsService {
    constructor(columnModel, taskModel) {
        this.columnModel = columnModel;
        this.taskModel = taskModel;
    }
    async findAll() {
        return this.columnModel.find().exec();
    }
    async findOne(id) {
        return this.columnModel.findById(id).exec();
    }
    async update(id, updateColumnDto) {
        return this.columnModel.findByIdAndUpdate(id, updateColumnDto).exec();
    }
    async remove(id) {
        return this.columnModel.findByIdAndRemove(id).exec();
    }
    async createTask(id, createTaskDto) {
        const tasks = Array.isArray(createTaskDto) ? createTaskDto : [createTaskDto];
        const createdTasks = await this.taskModel.insertMany(tasks.map((task) => ({ ...task, column: id })));
        return this.columnModel.findByIdAndUpdate(id, {
            $push: {
                tasks: {
                    $each: createdTasks,
                },
            },
        });
    }
};
exports.ColumnsService = ColumnsService;
exports.ColumnsService = ColumnsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Column')),
    __param(1, (0, mongoose_1.InjectModel)('Task')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ColumnsService);
//# sourceMappingURL=columns.service.js.map