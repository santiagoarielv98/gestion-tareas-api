"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const boards_controller_1 = require("./boards.controller");
const boards_service_1 = require("./boards.service");
const column_schema_1 = require("../columns/schema/column.schema");
const board_schema_1 = require("./schema/board.schema");
let BoardsModule = class BoardsModule {
};
exports.BoardsModule = BoardsModule;
exports.BoardsModule = BoardsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: board_schema_1.Board.name, schema: board_schema_1.BoardSchema },
                { name: column_schema_1.Column.name, schema: column_schema_1.ColumnSchema },
            ]),
        ],
        controllers: [boards_controller_1.BoardsController],
        providers: [boards_service_1.BoardsService],
        exports: [mongoose_1.MongooseModule],
    })
], BoardsModule);
//# sourceMappingURL=boards.module.js.map