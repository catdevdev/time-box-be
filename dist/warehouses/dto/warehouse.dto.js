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
exports.PositionType = exports.WarehouseType = void 0;
const graphql_1 = require("@nestjs/graphql");
const box_dto_1 = require("../../boxes/dto/box.dto");
const warehouses_group_dto_1 = require("../../warehouses-group/dto/warehouses-group.dto");
let WarehouseType = class WarehouseType {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], WarehouseType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => [box_dto_1.BoxType]),
    __metadata("design:type", Array)
], WarehouseType.prototype, "boxes", void 0);
__decorate([
    (0, graphql_1.Field)(() => warehouses_group_dto_1.WarehouseGroupType),
    __metadata("design:type", warehouses_group_dto_1.WarehouseGroupType)
], WarehouseType.prototype, "warehouseGroup", void 0);
WarehouseType = __decorate([
    (0, graphql_1.ObjectType)()
], WarehouseType);
exports.WarehouseType = WarehouseType;
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
//# sourceMappingURL=warehouse.dto.js.map