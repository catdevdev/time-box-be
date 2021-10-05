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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehousesGroupService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const warehouses_service_1 = require("../warehouses/warehouses.service");
const warehouses_group_schema_1 = require("./schemas/warehouses-group.schema");
let WarehousesGroupService = class WarehousesGroupService {
    constructor(warehouseGroupModel, warehouseService) {
        this.warehouseGroupModel = warehouseGroupModel;
        this.warehouseService = warehouseService;
    }
    async createWarehouseGroup(warehouseGroupInput) {
        const createdWarehouseGroup = new this.warehouseGroupModel(Object.assign(Object.assign({}, warehouseGroupInput), { _id: new mongoose_2.Types.ObjectId() }));
        return createdWarehouseGroup.save();
    }
    async findAllWarehouseGroups() {
        const a = this.warehouseGroupModel
            .find()
            .populate({ path: 'warehouses', populate: { path: 'boxes' } })
            .exec();
        const b = await a;
        return a;
    }
    async findByIDWarehouseGroup(id) {
        return this.warehouseGroupModel.findOne({ _id: id }).exec();
    }
};
WarehousesGroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(warehouses_group_schema_1.WarehouseGroup.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        warehouses_service_1.WarehousesService])
], WarehousesGroupService);
exports.WarehousesGroupService = WarehousesGroupService;
//# sourceMappingURL=warehouses-group.service.js.map