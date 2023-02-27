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
exports.WarehouseSchema = exports.Warehouse = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const box_schema_1 = require("../../boxes/schemas/box.schema");
const warehouses_group_schema_1 = require("../../warehouses-group/schemas/warehouses-group.schema");
const class_transformer_1 = require("class-transformer");
let Warehouse = class Warehouse {
};
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.toString()),
    __metadata("design:type", Object)
], Warehouse.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: warehouses_group_schema_1.WarehouseGroup.name }),
    __metadata("design:type", warehouses_group_schema_1.WarehouseGroup)
], Warehouse.prototype, "warehouseGroup", void 0);
Warehouse = __decorate([
    (0, mongoose_1.Schema)()
], Warehouse);
exports.Warehouse = Warehouse;
exports.WarehouseSchema = mongoose_1.SchemaFactory.createForClass(Warehouse);
exports.WarehouseSchema.virtual('boxes', {
    ref: 'Box',
    localField: '_id',
    foreignField: 'warehouse',
});
//# sourceMappingURL=warehouse.schema.js.map