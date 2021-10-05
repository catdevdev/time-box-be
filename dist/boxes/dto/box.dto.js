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
exports.BoxType = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_dto_1 = require("../../users/dto/user.dto");
const warehouse_dto_1 = require("../../warehouses/dto/warehouse.dto");
let BoxType = class BoxType {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], BoxType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BoxType.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BoxType.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], BoxType.prototype, "imageIds", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], BoxType.prototype, "notes", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], BoxType.prototype, "dateWhenCanBeOpened", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], BoxType.prototype, "isCanBeOpened", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], BoxType.prototype, "isOpened", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], BoxType.prototype, "placement", void 0);
__decorate([
    (0, graphql_1.Field)(() => warehouse_dto_1.WarehouseType, { nullable: true }),
    __metadata("design:type", warehouse_dto_1.WarehouseType)
], BoxType.prototype, "warehouse", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_dto_1.UserType),
    __metadata("design:type", user_dto_1.UserType)
], BoxType.prototype, "user", void 0);
BoxType = __decorate([
    (0, graphql_1.ObjectType)()
], BoxType);
exports.BoxType = BoxType;
//# sourceMappingURL=box.dto.js.map