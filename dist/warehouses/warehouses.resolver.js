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
const transportSubstrate_dto_1 = require("./dto/transportSubstrate.dto");
let WarehousesResolver = class WarehousesResolver {
    constructor(warehousesService) {
        this.warehousesService = warehousesService;
    }
    async warehouses() {
        return this.warehousesService.findAllWarehouses();
    }
    async warehouse(input) {
        return this.warehousesService.findByIDWarehouse(input);
    }
    async boxesPosition(warehouseId) {
        const positions = [
            ...(await this.warehousesService.getBoxesPosition(warehouseId)),
            ...this.warehousesService
                .boxesToTransport(warehouseId)
                .boxes.map((box) => {
                return {
                    boxId: box.boxId,
                    position: box.position,
                };
            }),
        ];
        console.log(positions);
        return positions;
    }
    async freeWarehouseByWarehouseGroupId(warehouseGroupId) {
        return this.warehousesService.getFreeWarehouseByWarehouseGroupId(warehouseGroupId);
    }
    async transportSubstratePositions() {
        return this.warehousesService.transportSubstratePositions;
    }
    async transportSubstratePosition(warehouseId) {
        return this.warehousesService.transportSubstratePosition(warehouseId);
    }
    async createWarehouse(warehouseId) {
        return this.warehousesService.createWarehouse(warehouseId);
    }
    moveTransport(input) {
        return warehouses_service_1.pubSub.asyncIterator('transportPosition');
    }
    boxesToTransportPosition(input) {
        return warehouses_service_1.pubSub.asyncIterator('boxesToTransportPosition');
    }
    boxToTransport(warehouseId) {
        const boxToTransport = this.warehousesService.boxesToTransport(warehouseId);
        console.log(boxToTransport);
        return {
            warehouseId: boxToTransport.warehouseId,
            boxes: boxToTransport.boxes,
        };
    }
    async putBoxIntoWarehouse(putBoxIntoWarehouseInput) {
        const freeWarehouse = await this.warehousesService.getFreeWarehouseByWarehouseGroupId(putBoxIntoWarehouseInput.warehouseGroupId);
        this.warehousesService.addToQueue(freeWarehouse._id.toString(), {
            name: 'loadBox',
            boxId: putBoxIntoWarehouseInput.boxId,
            seconds: putBoxIntoWarehouseInput.seconds,
        });
        return freeWarehouse;
    }
    async unloadBoxFromWarehouse(unloadBoxFromWarehouseInput) {
        this.warehousesService.addToQueue(unloadBoxFromWarehouseInput.warehouseId, {
            name: 'unload',
            boxId: unloadBoxFromWarehouseInput.boxId,
        });
        const warehouse = await this.warehousesService.findByIDWarehouse(unloadBoxFromWarehouseInput.warehouseId);
        return warehouse;
    }
};
__decorate([
    (0, graphql_1.Query)(() => [warehouse_dto_1.WarehouseType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WarehousesResolver.prototype, "warehouses", null);
__decorate([
    (0, graphql_1.Query)(() => [warehouse_dto_1.WarehouseType]),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WarehousesResolver.prototype, "warehouse", null);
__decorate([
    (0, graphql_1.Query)(() => [transportSubstrate_dto_1.BoxPositionType]),
    __param(0, (0, graphql_1.Args)('warehouseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WarehousesResolver.prototype, "boxesPosition", null);
__decorate([
    (0, graphql_1.Query)(() => warehouse_dto_1.WarehouseType),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WarehousesResolver.prototype, "freeWarehouseByWarehouseGroupId", null);
__decorate([
    (0, graphql_1.Query)(() => [transportSubstrate_dto_1.TransportSubstrateType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WarehousesResolver.prototype, "transportSubstratePositions", null);
__decorate([
    (0, graphql_1.Query)(() => transportSubstrate_dto_1.TransportSubstrateType),
    __param(0, (0, graphql_1.Args)('warehouseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WarehousesResolver.prototype, "transportSubstratePosition", null);
__decorate([
    (0, graphql_1.Mutation)(() => warehouse_dto_1.WarehouseType),
    __param(0, (0, graphql_1.Args)('warehouseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WarehousesResolver.prototype, "createWarehouse", null);
__decorate([
    (0, graphql_1.Subscription)(() => transportSubstrate_dto_1.TransportSubstrateType, {
        filter: (payload, variables) => {
            return payload.moveTransport.warehouseId === variables.input.warehouseId;
        },
    }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [warehouse_input_1.MoveTransportInput]),
    __metadata("design:returntype", void 0)
], WarehousesResolver.prototype, "moveTransport", null);
__decorate([
    (0, graphql_1.Subscription)(() => transportSubstrate_dto_1.GroupBoxesToTransportType, {
        filter: (payload, variables) => {
            return (payload.boxesToTransportPosition.box.warehouseId ===
                variables.input.warehouseId);
        },
    }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [warehouse_input_1.BoxStatusInput]),
    __metadata("design:returntype", void 0)
], WarehousesResolver.prototype, "boxesToTransportPosition", null);
__decorate([
    (0, graphql_1.Query)(() => transportSubstrate_dto_1.GroupBoxesToTransportType),
    __param(0, (0, graphql_1.Args)('warehouseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WarehousesResolver.prototype, "boxToTransport", null);
__decorate([
    (0, graphql_1.Query)(() => warehouse_dto_1.WarehouseType),
    __param(0, (0, graphql_1.Args)('putBoxIntoWarehouseInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [warehouse_input_1.PutBoxIntoWarehouseInput]),
    __metadata("design:returntype", Promise)
], WarehousesResolver.prototype, "putBoxIntoWarehouse", null);
__decorate([
    (0, graphql_1.Query)(() => warehouse_dto_1.WarehouseType),
    __param(0, (0, graphql_1.Args)('unloadBoxFromWarehouseInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [warehouse_input_1.UnloadBoxFromWarehouseInput]),
    __metadata("design:returntype", Promise)
], WarehousesResolver.prototype, "unloadBoxFromWarehouse", null);
WarehousesResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [warehouses_service_1.WarehousesService])
], WarehousesResolver);
exports.WarehousesResolver = WarehousesResolver;
//# sourceMappingURL=warehouses.resolver.js.map