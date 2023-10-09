"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSubtaskDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_subtask_dto_1 = require("./create-subtask.dto");
class UpdateSubtaskDto extends (0, mapped_types_1.PartialType)(create_subtask_dto_1.CreateSubtaskDto) {
}
exports.UpdateSubtaskDto = UpdateSubtaskDto;
//# sourceMappingURL=update-subtask.dto.js.map