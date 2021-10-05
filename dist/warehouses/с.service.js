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
const variables_1 = require("./variables");
let transportSubstratePositions = [];
exports.pubSub = new graphql_subscriptions_1.PubSub();
let TransportSubstrateService = class TransportSubstrateService {
    constructor(warehousesService) {
        this.warehousesService = warehousesService;
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
        this.goToOusideBoxFromStartedPosition = async (warehouseId, positionIncomeBox) => {
            const { x, y, z } = positionIncomeBox;
            const { position } = this.transportSubstratePosition(warehouseId);
            await this.moveTransport(warehouseId, { x: position.x, y, z });
            await this.moveTransport(warehouseId, { x, y, z });
        };
        this.goToStartedPositionFromOusideBox = async (warehouseId) => {
            const { x, y, z } = this.startedPosition;
            const { position } = this.transportSubstratePosition(warehouseId);
            await this.moveTransport(warehouseId, {
                x,
                y: position.y,
                z: position.z,
            });
            await this.moveTransport(warehouseId, {
                x,
                y,
                z,
            });
        };
        this.goToPlacementPositionFromStartedPosition = async (warehouseId, placementIndex) => {
            const positionsPlacement = variables_1.positionsPlacements[placementIndex].position;
            const { position: transportSubstratePosition } = this.transportSubstratePosition(warehouseId);
            await this.moveTransport(warehouseId, {
                x: transportSubstratePosition.x,
                y: transportSubstratePosition.y,
                z: positionsPlacement.z - 0.7,
            });
            await this.moveTransport(warehouseId, {
                x: positionsPlacement.x,
                y: transportSubstratePosition.y,
                z: positionsPlacement.z - 0.7,
            });
            await this.moveTransport(warehouseId, {
                x: positionsPlacement.x,
                y: positionsPlacement.y - 0.18,
                z: positionsPlacement.z - 0.7,
            });
            await this.moveTransport(warehouseId, {
                x: positionsPlacement.x,
                y: positionsPlacement.y - 0.18,
                z: positionsPlacement.z,
            });
        };
        this.goToStartedPositionFromPlacementPosition = async (warehouseId) => {
            const { position: transportSubstratePosition } = this.transportSubstratePosition(warehouseId);
            await this.moveTransport(warehouseId, {
                x: transportSubstratePosition.x,
                y: transportSubstratePosition.y,
                z: transportSubstratePosition.z - 0.7,
            });
            await this.moveTransport(warehouseId, {
                x: transportSubstratePosition.x,
                y: this.startedPosition.y,
                z: transportSubstratePosition.z - 0.7,
            });
            await this.moveTransport(warehouseId, {
                x: this.startedPosition.x,
                y: this.startedPosition.y,
                z: transportSubstratePosition.z - 0.7,
            });
            await this.moveTransport(warehouseId, {
                x: this.startedPosition.x,
                y: this.startedPosition.y,
                z: this.startedPosition.z,
            });
        };
        this.fillTransportSubstratePositions();
    }
};
TransportSubstrateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [warehouses_service_1.WarehousesService])
], TransportSubstrateService);
exports.TransportSubstrateService = TransportSubstrateService;
//# sourceMappingURL=%D1%81.service.js.map