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
const warehouses_group_schema_1 = require("./schemas/warehouses-group.schema");
let WarehousesGroupService = class WarehousesGroupService {
    constructor(warehousesGroupModel) {
        this.warehousesGroupModel = warehousesGroupModel;
    }
    async createWarehouseGroup(warehouseGroupInput) {
        const createdWarehouseGroup = new this.warehouseGroupModel(warehouseGroupInput);
        console.log(warehouseGroupInput);
        console.log(createdWarehouseGroup);
        const a = createdWarehouseGroup.save();
        console.log(await a);
        return a;
    }
    async findAllWarehouseGroups() {
        return this.warehouseGroupModel.find().exec();
    }
    async findAllWarehouses() {
        return this.warehouseGroupModel.find().populate('boxes').exec();
    }
    async findByIDWarehouseGroup(id) {
        return this.warehouseGroupModel.find({ _id: id }).exec();
    }
};
WarehousesGroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(warehouses_group_schema_1.WarehouseGroup.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WarehousesGroupService);
exports.WarehousesGroupService = WarehousesGroupService;
//# sourceMappingURL=warehouse-group.service.js.map