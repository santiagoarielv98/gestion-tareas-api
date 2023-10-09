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
exports.ColumnsController = void 0;
const common_1 = require("@nestjs/common");
const columns_service_1 = require("./columns.service");
const update_column_dto_1 = require("./dto/update-column.dto");
let ColumnsController = class ColumnsController {
    constructor(columnsService) {
        this.columnsService = columnsService;
    }
    findAll() {
        return this.columnsService.findAll();
    }
    findOne(id) {
        return this.columnsService.findOne(id);
    }
    update(id, updateColumnDto) {
        return this.columnsService.update(id, updateColumnDto);
    }
    remove(id) {
        return this.columnsService.remove(id);
    }
    createTask(columnId, createTaskDto) {
        return this.columnsService.createTask(columnId, createTaskDto);
    }
};
exports.ColumnsController = ColumnsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_column_dto_1.UpdateColumnDto]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/tasks'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "createTask", null);
exports.ColumnsController = ColumnsController = __decorate([
    (0, common_1.Controller)('columns'),
    __metadata("design:paramtypes", [columns_service_1.ColumnsService])
], ColumnsController);
//# sourceMappingURL=columns.controller.js.map