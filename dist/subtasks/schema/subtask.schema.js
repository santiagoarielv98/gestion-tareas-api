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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubtaskSchema = exports.Subtask = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Subtask = class Subtask {
};
exports.Subtask = Subtask;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Subtask.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Subtask.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Subtask.prototype, "position", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Task', required: true }),
    __metadata("design:type", String)
], Subtask.prototype, "task", void 0);
exports.Subtask = Subtask = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], Subtask);
exports.SubtaskSchema = mongoose_1.SchemaFactory.createForClass(Subtask);
//# sourceMappingURL=subtask.schema.js.map