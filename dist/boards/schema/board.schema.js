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
exports.BoardSchema = exports.Board = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Board = class Board {
};
exports.Board = Board;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Board.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Board.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", Number)
], Board.prototype, "position", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Column' }] }),
    __metadata("design:type", Array)
], Board.prototype, "columns", void 0);
exports.Board = Board = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], Board);
exports.BoardSchema = mongoose_1.SchemaFactory.createForClass(Board);
exports.BoardSchema.pre('save', function (next) {
    if (!this.isNew)
        return next();
    this.constructor
        .countDocuments()
        .then((count) => {
        console.log(count);
        this.position = count;
        next();
    })
        .catch((err) => next(err));
});
exports.BoardSchema.pre('insertMany', function (next, docs) {
    this.countDocuments()
        .then((count) => {
        docs.forEach((doc, i) => {
            doc.position = count + i;
        });
        next();
    })
        .catch((err) => next(err));
});
//# sourceMappingURL=board.schema.js.map