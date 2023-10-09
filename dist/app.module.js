"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const boards_module_1 = require("./boards/boards.module");
const columns_module_1 = require("./columns/columns.module");
const subtasks_module_1 = require("./subtasks/subtasks.module");
const tasks_module_1 = require("./tasks/tasks.module");
const seeds_service_1 = require("./seeds/seeds.service");
const uri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/kanban';
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(uri),
            boards_module_1.BoardsModule,
            columns_module_1.ColumnsModule,
            tasks_module_1.TasksModule,
            subtasks_module_1.SubtasksModule,
        ],
        controllers: [],
        providers: [seeds_service_1.SeedsService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map