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
exports.SeedsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let SeedsService = exports.SeedsService = class SeedsService {
    constructor(boardModel, columnModel, taskModel, subtaskModel) {
        this.boardModel = boardModel;
        this.columnModel = columnModel;
        this.taskModel = taskModel;
        this.subtaskModel = subtaskModel;
    }
    async onApplicationBootstrap() {
        await this.boardModel.deleteMany({});
        await this.columnModel.deleteMany({});
        await this.taskModel.deleteMany({});
        await this.subtaskModel.deleteMany({});
        await this.seed();
    }
    async seed() {
        await this.seedBoard();
    }
    async seedBoard() {
        const boards = Array.from({ length: 5 }).map((_, i) => ({
            name: `Board ${i + 1}`,
            description: `Description ${i + 1}`,
            position: i,
            columns: [],
        }));
        const createdBoards = await this.boardModel.insertMany(boards);
        await Promise.all(createdBoards.map(async (board) => {
            const columns = await this.seedColumn(board._id.toString());
            await Promise.all(columns.map(async (column) => {
                const tasks = await this.seedTask(column._id.toString());
                await Promise.all(tasks.map(async (task) => {
                    const subtasks = await this.seedSubtask(task._id.toString());
                    task.subtasks = subtasks.map((subtask) => subtask._id.toString());
                    await task.save();
                }));
                column.tasks = tasks.map((task) => task._id.toString());
                await column.save();
            }));
            board.columns = columns.map((column) => column._id.toString());
            await board.save();
        }));
        return createdBoards;
    }
    async seedColumn(boardId) {
        const columns = Array.from({ length: 5 }).map((_, i) => ({
            name: `Column ${i + 1}`,
            description: `Description ${i + 1}`,
            board: boardId,
            position: i,
            tasks: [],
        }));
        const createdColumns = await this.columnModel.insertMany(columns);
        return createdColumns;
    }
    async seedTask(columnId) {
        const tasks = Array.from({ length: 5 }).map((_, i) => ({
            name: `Task ${i + 1}`,
            description: `Description ${i + 1}`,
            column: columnId,
            position: i,
            done: false,
            subtasks: [],
        }));
        const createdTasks = await this.taskModel.insertMany(tasks);
        return createdTasks;
    }
    async seedSubtask(taskId) {
        const subtasks = Array.from({ length: 5 }).map((_, i) => ({
            name: `Subtask ${i + 1}`,
            description: `Description ${i + 1}`,
            task: taskId,
            position: i,
            done: false,
        }));
        const createdSubtasks = await this.subtaskModel.insertMany(subtasks);
        return createdSubtasks;
    }
};
exports.SeedsService = SeedsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Board')),
    __param(1, (0, mongoose_1.InjectModel)('Column')),
    __param(2, (0, mongoose_1.InjectModel)('Task')),
    __param(3, (0, mongoose_1.InjectModel)('Subtask')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], SeedsService);
//# sourceMappingURL=seeds.service.js.map