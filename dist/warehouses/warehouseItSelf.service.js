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
exports.TransportSubstrateService = exports.pubSub = void 0;
const common_1 = require("@nestjs/common");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const warehouses_service_1 = require("./warehouses.service");
let transportSubstratePositions = [];
const WAREHOUSE_MAX_CAPICITY = 160;
exports.pubSub = new graphql_subscriptions_1.PubSub();
let TransportSubstrateService = class TransportSubstrateService {
    constructor(warehousesService) {
        this.warehousesService = warehousesService;
        this.processWarehouseGroups = async () => {
            const warehouseGroups = await this.warehousesService.findAllWarehouses();
            warehouseGroups.map(({ _id }) => {
                this.processWarehouseGroup(_id);
            });
            this.fillTransportSubstratePositions();
        };
        this.processWarehouseGroup = (warehouseGroupId) => {
            this.warehousesService.findAllWarehouses;
        };
        this.startedPosition = { x: 0, y: 0.1, z: 2.1 };
        this.transportSubstratePositions = transportSubstratePositions;
        this.fillTransportSubstratePositions = async () => {
            const warehouses = await this.warehousesService.findAllWarehouses();
            console.log(warehouses);
            warehouses.map(({ _id }) => {
                transportSubstratePositions.push({
                    warehouseId: _id,
                    position: this.startedPosition,
                });
            });
        };
        this.transportSubstratePosition = (warehouseId) => {
            return transportSubstratePositions.find((transportSubstratePosition) => transportSubstratePosition.warehouseId === warehouseId);
        };
        this.moveTransport = (warehouseId, to) => {
            const speed = 1;
            const { x: transportSubstrateX, y: transportSubstrateY, z: transportSubstrateZ, } = this.transportSubstratePosition(warehouseId).position;
            const { x: toX, y: toY, z: toZ } = to;
            const { sqrt, pow } = Math;
            const distance = sqrt(pow(transportSubstrateX - toX, 2) +
                pow(transportSubstrateY - toY, 2) +
                pow(transportSubstrateZ - toZ, 2));
            const transportSubstratePositionIndex = transportSubstratePositions.findIndex((transportSubstratePosition) => transportSubstratePosition.warehouseId === warehouseId);
            transportSubstratePositions[transportSubstratePositionIndex].position = to;
            exports.pubSub.publish('transportPosition', {
                moveTransport: {
                    position: transportSubstratePositions[transportSubstratePositionIndex].position,
                    warehouseId: transportSubstratePositions[transportSubstratePositionIndex]
                        .warehouseId,
                    speed,
                },
            });
            const delay = 0;
            const time = (distance * 1100 + delay) / speed;
            console.log(time);
            return new Promise(function (resolve) {
                setTimeout(resolve, time);
            });
        };
        this.putBoxIntoWarehouse = async (warehouseId, placementIndex, incomingBoxPosition) => {
            await this.goToOusideBoxFromStartedPosition(warehouseId, incomingBoxPosition);
            await this.goToStartedPositionFromOusideBox(warehouseId);
            await this.goToPlacementPositionFromStartedPosition(warehouseId, placementIndex);
            await this.goToStartedPositionFromPlacementPosition(warehouseId);
        };
        this.fillTransportSubstratePositions();
        this.processWarehouse();
    }
};
TransportSubstrateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [warehouses_service_1.WarehousesService])
], TransportSubstrateService);
exports.TransportSubstrateService = TransportSubstrateService;
//# sourceMappingURL=warehouseItSelf.service.js.map