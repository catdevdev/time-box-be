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
exports.WarehousesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const warehouse_dto_1 = require("./dto/warehouse.dto");
const warehouse_input_1 = require("./inputs/warehouse.input");
const warehouses_service_1 = require("./warehouses.service");
let WarehousesResolver = class WarehousesResolver {
    constructor(warehousesService) {
        this.warehousesService = warehousesService;
    }
    async hello() {
        return 'Hello 45!';
    }
    async warehouses() {
        return this.warehousesService.findAll();
    }
    async warehouse(input) {
        return this.warehousesService.findByName(input);
    }
    async createdWarehouse(input) {
        console.log(input);
        return this.warehousesService.create(input);
    }
};
__decorate([
    (0, graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WarehousesResolver.prototype, "hello", null);
__decorate([
    (0, graphql_1.Query)(() => [warehouse_dto_1.WarehouseType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WarehousesResolver.prototype, "warehouses", null);
__decorate([
    (0, graphql_1.Query)(() => [warehouse_dto_1.WarehouseType]),
    __param(0, (0, graphql_1.Args)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WarehousesResolver.prototype, "warehouse", null);
__decorate([
    (0, graphql_1.Mutation)(() => warehouse_dto_1.WarehouseType),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [warehouse_input_1.WarehouseInput]),
    __metadata("design:returntype", Promise)
], WarehousesResolver.prototype, "createdWarehouse", null);
WarehousesResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [warehouses_service_1.WarehousesService])
], WarehousesResolver);
exports.WarehousesResolver = WarehousesResolver;
//# sourceMappingURL=warehouses.resolver.js.map