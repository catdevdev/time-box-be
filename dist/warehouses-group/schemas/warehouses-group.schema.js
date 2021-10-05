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
exports.WarehouseGroupSchema = exports.WarehouseGroup = exports.Location = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const box_schema_1 = require("../../boxes/schemas/box.schema");
const warehouse_schema_1 = require("../../warehouses/schemas/warehouse.schema");
const class_transformer_1 = require("class-transformer");
let Location = class Location {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Location.prototype, "longitude", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Location.prototype, "latitude", void 0);
Location = __decorate([
    (0, mongoose_1.Schema)()
], Location);
exports.Location = Location;
let WarehouseGroup = class WarehouseGroup {
};
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.toString()),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], WarehouseGroup.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], WarehouseGroup.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Location }),
    __metadata("design:type", Location)
], WarehouseGroup.prototype, "location", void 0);
WarehouseGroup = __decorate([
    (0, mongoose_1.Schema)()
], WarehouseGroup);
exports.WarehouseGroup = WarehouseGroup;
exports.WarehouseGroupSchema = mongoose_1.SchemaFactory.createForClass(WarehouseGroup);
exports.WarehouseGroupSchema.virtual('warehouses', {
    ref: 'Warehouse',
    localField: '_id',
    foreignField: 'warehouseGroup',
});
//# sourceMappingURL=warehouses-group.schema.js.map