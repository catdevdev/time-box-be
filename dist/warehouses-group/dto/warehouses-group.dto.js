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
exports.WarehouseGroupType = void 0;
const graphql_1 = require("@nestjs/graphql");
const warehouse_dto_1 = require("../../warehouses/dto/warehouse.dto");
const warehouse_schema_1 = require("../../warehouses/schemas/warehouse.schema");
let LocationType = class LocationType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], LocationType.prototype, "latitude", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], LocationType.prototype, "longitude", void 0);
LocationType = __decorate([
    (0, graphql_1.ObjectType)()
], LocationType);
let WarehouseGroupType = class WarehouseGroupType {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], WarehouseGroupType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], WarehouseGroupType.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => LocationType),
    __metadata("design:type", LocationType)
], WarehouseGroupType.prototype, "location", void 0);
__decorate([
    (0, graphql_1.Field)(() => [warehouse_dto_1.WarehouseType]),
    __metadata("design:type", Array)
], WarehouseGroupType.prototype, "warehouses", void 0);
WarehouseGroupType = __decorate([
    (0, graphql_1.ObjectType)()
], WarehouseGroupType);
exports.WarehouseGroupType = WarehouseGroupType;
//# sourceMappingURL=warehouses-group.dto.js.map