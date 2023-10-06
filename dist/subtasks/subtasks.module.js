"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubtasksModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const subtasks_controller_1 = require("./subtasks.controller");
const subtasks_service_1 = require("./subtasks.service");
const subtask_schema_1 = require("./schema/subtask.schema");
let SubtasksModule = exports.SubtasksModule = class SubtasksModule {
};
exports.SubtasksModule = SubtasksModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: subtask_schema_1.Subtask.name, schema: subtask_schema_1.SubtaskSchema }])],
        controllers: [subtasks_controller_1.SubtasksController],
        providers: [subtasks_service_1.SubtasksService],
    })
], SubtasksModule);
//# sourceMappingURL=subtasks.module.js.map