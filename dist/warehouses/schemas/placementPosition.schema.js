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
exports.PlacementPositionSchema = exports.BoxPositionType = exports.PositionType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const box_schema_1 = require("../../boxes/schemas/box.schema");
let PositionType = class PositionType {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], PositionType.prototype, "x", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], PositionType.prototype, "y", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], PositionType.prototype, "z", void 0);
PositionType = __decorate([
    (0, mongoose_1.Schema)()
], PositionType);
exports.PositionType = PositionType;
let BoxPositionType = class BoxPositionType {
};
__decorate([
    Field(() => PositionType),
    __metadata("design:type", PositionType)
], BoxPositionType.prototype, "position", void 0);
BoxPositionType = __decorate([
    ObjectType()
], BoxPositionType);
exports.BoxPositionType = BoxPositionType;
exports.PlacementPositionSchema = mongoose_1.SchemaFactory.createForClass(PlacementPosition);
//# sourceMappingURL=placementPosition.schema.js.map