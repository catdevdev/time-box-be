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
exports.AddNoteIntoBoxInput = exports.AddPlacementForBoxInput = exports.BoxInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let BoxInput = class BoxInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BoxInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BoxInput.prototype, "description", void 0);
BoxInput = __decorate([
    (0, graphql_1.InputType)()
], BoxInput);
exports.BoxInput = BoxInput;
let AddPlacementForBoxInput = class AddPlacementForBoxInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AddPlacementForBoxInput.prototype, "boxId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], AddPlacementForBoxInput.prototype, "placement", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AddPlacementForBoxInput.prototype, "warehouseId", void 0);
AddPlacementForBoxInput = __decorate([
    (0, graphql_1.InputType)()
], AddPlacementForBoxInput);
exports.AddPlacementForBoxInput = AddPlacementForBoxInput;
let AddNoteIntoBoxInput = class AddNoteIntoBoxInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AddNoteIntoBoxInput.prototype, "boxId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AddNoteIntoBoxInput.prototype, "note", void 0);
AddNoteIntoBoxInput = __decorate([
    (0, graphql_1.InputType)()
], AddNoteIntoBoxInput);
exports.AddNoteIntoBoxInput = AddNoteIntoBoxInput;
//# sourceMappingURL=box.input.js.map