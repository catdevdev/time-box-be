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
exports.UnloadBoxFromWarehouseInput = exports.PutBoxIntoWarehouseInput = exports.BoxStatusInput = exports.MoveTransportInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let MoveTransportInput = class MoveTransportInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MoveTransportInput.prototype, "warehouseId", void 0);
MoveTransportInput = __decorate([
    (0, graphql_1.InputType)()
], MoveTransportInput);
exports.MoveTransportInput = MoveTransportInput;
let BoxStatusInput = class BoxStatusInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BoxStatusInput.prototype, "warehouseId", void 0);
BoxStatusInput = __decorate([
    (0, graphql_1.InputType)()
], BoxStatusInput);
exports.BoxStatusInput = BoxStatusInput;
let PutBoxIntoWarehouseInput = class PutBoxIntoWarehouseInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PutBoxIntoWarehouseInput.prototype, "warehouseGroupId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PutBoxIntoWarehouseInput.prototype, "boxId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PutBoxIntoWarehouseInput.prototype, "seconds", void 0);
PutBoxIntoWarehouseInput = __decorate([
    (0, graphql_1.InputType)()
], PutBoxIntoWarehouseInput);
exports.PutBoxIntoWarehouseInput = PutBoxIntoWarehouseInput;
let UnloadBoxFromWarehouseInput = class UnloadBoxFromWarehouseInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UnloadBoxFromWarehouseInput.prototype, "warehouseId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UnloadBoxFromWarehouseInput.prototype, "boxId", void 0);
UnloadBoxFromWarehouseInput = __decorate([
    (0, graphql_1.InputType)()
], UnloadBoxFromWarehouseInput);
exports.UnloadBoxFromWarehouseInput = UnloadBoxFromWarehouseInput;
//# sourceMappingURL=warehouse.input.js.map