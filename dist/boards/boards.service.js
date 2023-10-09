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
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let BoardsService = class BoardsService {
    constructor(boardModel, columnModel) {
        this.boardModel = boardModel;
        this.columnModel = columnModel;
    }
    async create(createBoardDto) {
        const createdBoard = new this.boardModel(createBoardDto);
        return createdBoard.save();
    }
    async findAll() {
        return this.boardModel.find().exec();
    }
    async findOne(id) {
        return this.boardModel.findById(id).exec();
    }
    async update(id, updateBoardDto) {
        return this.boardModel.findByIdAndUpdate(id, updateBoardDto).exec();
    }
    async remove(id) {
        return this.boardModel.findByIdAndRemove(id).exec();
    }
    async createColumn(id, createColumnDto) {
        const columns = Array.isArray(createColumnDto) ? createColumnDto : [createColumnDto];
        const createdColumns = await this.columnModel.insertMany(columns.map((column) => ({ ...column, board: id })));
        return this.boardModel.findByIdAndUpdate(id, {
            $push: {
                columns: {
                    $each: createdColumns,
                },
            },
        });
    }
};
exports.BoardsService = BoardsService;
exports.BoardsService = BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Board')),
    __param(1, (0, mongoose_1.InjectModel)('Column')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], BoardsService);
//# sourceMappingURL=boards.service.js.map