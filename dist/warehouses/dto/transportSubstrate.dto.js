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
exports.GroupBoxesToTransportType = exports.BoxToTransportType = exports.TransportSubstrateType = exports.BoxPositionType = exports.PositionType = void 0;
const graphql_1 = require("@nestjs/graphql");
const box_dto_1 = require("../../boxes/dto/box.dto");
let PositionType = class PositionType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PositionType.prototype, "x", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PositionType.prototype, "y", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PositionType.prototype, "z", void 0);
PositionType = __decorate([
    (0, graphql_1.ObjectType)()
], PositionType);
exports.PositionType = PositionType;
let BoxPositionType = class BoxPositionType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BoxPositionType.prototype, "boxId", void 0);
__decorate([
    (0, graphql_1.Field)(() => PositionType),
    __metadata("design:type", PositionType)
], BoxPositionType.prototype, "position", void 0);
BoxPositionType = __decorate([
    (0, graphql_1.ObjectType)()
], BoxPositionType);
exports.BoxPositionType = BoxPositionType;
let TransportSubstrateType = class TransportSubstrateType {
};
__decorate([
    (0, graphql_1.Field)(() => PositionType),
    __metadata("design:type", PositionType)
], TransportSubstrateType.prototype, "position", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TransportSubstrateType.prototype, "warehouseId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], TransportSubstrateType.prototype, "boxOnSubstrate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], TransportSubstrateType.prototype, "speed", void 0);
TransportSubstrateType = __decorate([
    (0, graphql_1.ObjectType)()
], TransportSubstrateType);
exports.TransportSubstrateType = TransportSubstrateType;
let BoxToTransportType = class BoxToTransportType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BoxToTransportType.prototype, "warehouseId", void 0);
__decorate([
    (0, graphql_1.Field)(() => PositionType, { nullable: true }),
    __metadata("design:type", PositionType)
], BoxToTransportType.prototype, "position", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BoxToTransportType.prototype, "boxId", void 0);
BoxToTransportType = __decorate([
    (0, graphql_1.ObjectType)()
], BoxToTransportType);
exports.BoxToTransportType = BoxToTransportType;
let GroupBoxesToTransportType = class GroupBoxesToTransportType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GroupBoxesToTransportType.prototype, "actionName", void 0);
__decorate([
    (0, graphql_1.Field)(() => BoxToTransportType),
    __metadata("design:type", BoxToTransportType)
], GroupBoxesToTransportType.prototype, "box", void 0);
GroupBoxesToTransportType = __decorate([
    (0, graphql_1.ObjectType)()
], GroupBoxesToTransportType);
exports.GroupBoxesToTransportType = GroupBoxesToTransportType;
//# sourceMappingURL=transportSubstrate.dto.js.map