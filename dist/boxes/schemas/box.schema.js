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
exports.BoxSchema = exports.Box = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const warehouse_schema_1 = require("../../warehouses/schemas/warehouse.schema");
const user_schema_1 = require("../../users/schemas/user.schema");
const class_transformer_1 = require("class-transformer");
let Box = class Box {
};
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.toString()),
    __metadata("design:type", Object)
], Box.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Box.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Box.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Box.prototype, "placement", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Box.prototype, "imageIds", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Box.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Box.prototype, "dateWhenCanBeOpened", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Box.prototype, "isCanBeOpened", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Box.prototype, "isOpened", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: warehouse_schema_1.Warehouse.name }),
    __metadata("design:type", warehouse_schema_1.Warehouse)
], Box.prototype, "warehouse", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: user_schema_1.User.name }),
    __metadata("design:type", user_schema_1.User)
], Box.prototype, "user", void 0);
Box = __decorate([
    (0, mongoose_1.Schema)()
], Box);
exports.Box = Box;
exports.BoxSchema = mongoose_1.SchemaFactory.createForClass(Box);
//# sourceMappingURL=box.schema.js.map