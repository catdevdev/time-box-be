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
exports.WarehousesService = exports.pubSub = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const warehouse_schema_1 = require("./schemas/warehouse.schema");
const types_1 = require("../types");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const variables_1 = require("./variables");
const boxes_service_1 = require("../boxes/boxes.service");
const box_schema_1 = require("../boxes/schemas/box.schema");
const crypto_1 = require("crypto");
exports.pubSub = new graphql_subscriptions_1.PubSub();
const MAX_CAPACITY_WAREHOUSE = 160;
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}
let WarehousesService = class WarehousesService {
    constructor(warehouseModel, boxesService) {
        this.warehouseModel = warehouseModel;
        this.boxesService = boxesService;
        this.putBoxIntoWarehouse = async (warehouseId, boxId, seconds) => {
            const warehouse = await this.findByIDWarehouse(warehouseId);
            const incomingBoxPosition = {
                x: (0, crypto_1.randomInt)(-4, 4),
                y: 0.2,
                z: (0, crypto_1.randomInt)(3, 5),
            };
            this.addBoxToTransport(warehouseId, boxId, incomingBoxPosition);
            const busyPlacements = [];
            warehouse.boxes.map(({ placement }) => {
                busyPlacements.push(placement);
            });
            const freePlacements = [];
            Array.from(Array(MAX_CAPACITY_WAREHOUSE)).forEach((_, i) => {
                busyPlacements.forEach((index) => {
                    if (index !== i) {
                        freePlacements.push(i);
                    }
                });
                if (busyPlacements.length === 0) {
                    freePlacements.push(i);
                }
            });
            const placementIndex = freePlacements[Math.floor(Math.random() * freePlacements.length)];
            await this.goToOusideBoxFromStartedPosition(warehouseId, incomingBoxPosition);
            this.loadBoxOnSubstrate(warehouseId);
            this.removeBoxToTransport(warehouseId, boxId);
            await this.goToStartedPositionFromOusideBox(warehouseId);
            await this.goToPlacementPositionFromStartedPosition(warehouseId, placementIndex);
            await this.boxesService.addPlacementForBox(boxId, placementIndex, warehouseId);
            await this.boxesService.closeBoxForTime(boxId, seconds);
            this.addBoxToTransport(warehouseId, boxId, variables_1.positionsPlacements[placementIndex].position);
            this.unloadBoxFromSubstrate(warehouseId);
            await this.goToStartedPositionFromPlacementPosition(warehouseId);
        };
        this.unloadBoxFromWarehouse = async (warehouseId, boxId, boxPlacementIndex) => {
            const boxPositionOutside = {
                x: (0, crypto_1.randomInt)(-4, 4),
                y: 0.2,
                z: (0, crypto_1.randomInt)(3, 5),
            };
            await this.goToPlacementPositionFromStartedPosition(warehouseId, boxPlacementIndex);
            this.removeBoxToTransport(warehouseId, boxId);
            this.loadBoxOnSubstrate(warehouseId);
            await this.goToStartedPositionFromPlacementPosition(warehouseId);
            await this.goToOusideBoxFromStartedPosition(warehouseId, boxPositionOutside);
            await this.boxesService.unloadBox(boxId);
            this.unloadBoxFromSubstrate(warehouseId);
            this.addBoxToTransport(warehouseId, boxId, boxPositionOutside);
            await this.goToStartedPositionFromOusideBox(warehouseId);
        };
        this.getBoxesPosition = async (warehouseId) => {
            const result = await this.warehouseModel
                .findById(warehouseId)
                .populate('boxes')
                .exec();
            const positions = result.boxes.map((box) => {
                return {
                    boxId: box._id,
                    position: variables_1.positionsPlacements[box.placement].position,
                };
            });
            return positions;
        };
        this.getFreeWarehouseByWarehouseGroupId = async (warehouseGroupId) => {
            const warehouses = await this.findAllWarehouses();
            const warehousesByWarehouseGroup = warehouses.filter(({ warehouseGroup }) => {
                console.log(warehouseGroup);
                return warehouseGroup._id.toString() === warehouseGroupId;
            });
            console.log('warehouseGroupId');
            console.log(warehouseGroupId);
            console.log('warehouses');
            console.log(warehouses);
            console.log('warehousesByWarehouseGroup');
            console.log(warehousesByWarehouseGroup);
            const freeWarehouse = shuffle(warehousesByWarehouseGroup).find((warehouse) => {
                return warehouse.boxes.length < MAX_CAPACITY_WAREHOUSE;
            });
            console.log('freeWarehouse');
            console.log(freeWarehouse);
            if (!freeWarehouse) {
                const createWarehousePromises = [];
                Array.from(Array(2)).forEach(() => {
                    createWarehousePromises.push(this.createWarehouse(warehouseGroupId));
                });
                const newWarehouses = await Promise.all(createWarehousePromises);
                newWarehouses.forEach((warehouse) => {
                    this.transportSubstratePositions.push({
                        warehouseId: warehouse._id.toString(),
                        position: this.startedPosition,
                        boxOnSubstrate: false,
                    });
                    this.warehouseQueues.push({
                        isActive: false,
                        warehouseId: warehouse._id.toString(),
                        actions: [],
                    });
                    this.boxesToTransportPositions.push({
                        warehouseId: warehouse._id.toString(),
                        boxes: [],
                    });
                });
                const warehouses = await this.findAllWarehouses();
                const warehousesByWarehouseGroup = warehouses.filter(({ warehouseGroup }) => warehouseGroup._id.toString() === warehouseGroupId);
                return shuffle(warehousesByWarehouseGroup).find((warehouse) => {
                    return warehouse.boxes.length < MAX_CAPACITY_WAREHOUSE;
                });
            }
            else {
                return freeWarehouse;
            }
        };
        this.startedPosition = { x: 0, y: 0.02, z: 2.1 };
        this.transportSubstratePositions = [];
        this.boxesToTransportPositions = [];
        this.warehouseQueues = [];
        this.addToQueue = (warehouseId, action) => {
            const warehouseQueue = this.warehouseQueues.find((warehouseQueue) => {
                return warehouseQueue.warehouseId === warehouseId;
            });
            warehouseQueue.actions.push(action);
            if (warehouseQueue.isActive === false) {
                this.performQueue(warehouseId);
            }
        };
        this.performQueue = async (warehouseId) => {
            const warehouseQueue = this.warehouseQueues.find((warehouseQueue) => {
                return warehouseQueue.warehouseId === warehouseId;
            });
            if (warehouseQueue.actions.length === 0) {
                warehouseQueue.isActive = false;
                return;
            }
            warehouseQueue.isActive = true;
            if (warehouseQueue.actions[0].name === 'loadBox') {
                await this.putBoxIntoWarehouse(warehouseQueue.warehouseId, warehouseQueue.actions[0].boxId, warehouseQueue.actions[0].seconds);
            }
            if (warehouseQueue.actions[0].name === 'unload') {
                const box = await this.boxesService.findBoxById(warehouseQueue.actions[0].boxId);
                await this.unloadBoxFromWarehouse(warehouseQueue.warehouseId, warehouseQueue.actions[0].boxId, box.placement);
            }
            warehouseQueue.actions.shift();
            this.performQueue(warehouseId);
        };
        this.initTransportSubstrateInWarehouses = async () => {
            const warehouses = await this.findAllWarehouses();
            warehouses.map(({ _id }) => {
                this.transportSubstratePositions.push({
                    warehouseId: _id.toString(),
                    position: this.startedPosition,
                    boxOnSubstrate: false,
                });
                this.warehouseQueues.push({
                    isActive: false,
                    warehouseId: _id.toString(),
                    actions: [],
                });
                this.boxesToTransportPositions.push({
                    warehouseId: _id.toString(),
                    boxes: [],
                });
            });
        };
        this.addTransportSubstrate = (warehouseId) => {
            this.transportSubstratePositions.push({
                warehouseId,
                position: this.startedPosition,
                boxOnSubstrate: false,
            });
        };
        this.transportSubstratePosition = (warehouseId) => {
            return this.transportSubstratePositions.find((transportSubstratePosition) => transportSubstratePosition.warehouseId === warehouseId);
        };
        this.moveTransport = (warehouseId, to) => {
            const speed = 0.8;
            const { x: transportSubstrateX, y: transportSubstrateY, z: transportSubstrateZ, } = this.transportSubstratePosition(warehouseId).position;
            const { x: toX, y: toY, z: toZ } = to;
            const { sqrt, pow } = Math;
            const distance = sqrt(pow(transportSubstrateX - toX, 2) +
                pow(transportSubstrateY - toY, 2) +
                pow(transportSubstrateZ - toZ, 2));
            const transportSubstratePositionIndex = this.transportSubstratePositions.findIndex((transportSubstratePosition) => transportSubstratePosition.warehouseId === warehouseId);
            this.transportSubstratePositions[transportSubstratePositionIndex].position =
                to;
            exports.pubSub.publish('transportPosition', {
                moveTransport: {
                    position: this.transportSubstratePositions[transportSubstratePositionIndex]
                        .position,
                    warehouseId: this.transportSubstratePositions[transportSubstratePositionIndex]
                        .warehouseId,
                    speed,
                    boxOnSubstrate: this.transportSubstratePositions[transportSubstratePositionIndex]
                        .boxOnSubstrate,
                },
            });
            const delay = 0;
            const time = (distance * 1100 + delay) / speed;
            return new Promise(function (resolve) {
                setTimeout(resolve, time);
            });
        };
        this.loadBoxOnSubstrate = (warehouseId) => {
            this.transportSubstratePosition(warehouseId).boxOnSubstrate = true;
        };
        this.unloadBoxFromSubstrate = (warehouseId) => {
            this.transportSubstratePosition(warehouseId).boxOnSubstrate = false;
        };
        this.goToOusideBoxFromStartedPosition = async (warehouseId, positionIncomeBox) => {
            const { x, y, z } = positionIncomeBox;
            const { position } = this.transportSubstratePosition(warehouseId);
            await this.moveTransport(warehouseId, {
                x: position.x,
                y: this.startedPosition.y,
                z,
            });
            await this.moveTransport(warehouseId, { x, y: this.startedPosition.y, z });
        };
        this.goToStartedPositionFromOusideBox = async (warehouseId) => {
            const { x, y, z } = this.startedPosition;
            const { position } = this.transportSubstratePosition(warehouseId);
            await this.moveTransport(warehouseId, {
                x,
                y: this.startedPosition.y,
                z: position.z,
            });
            await this.moveTransport(warehouseId, {
                x,
                y: this.startedPosition.y,
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
        this.boxesToTransport = (warehouseId) => {
            const boxToTransport = this.boxesToTransportPositions.find((boxToTransportPosition) => {
                return boxToTransportPosition.warehouseId === warehouseId;
            });
            return boxToTransport;
        };
        this.addBoxToTransport = (warehouseId, boxId, position) => {
            const boxToTransport = this.boxesToTransportPositions.find((boxToTransportPosition) => {
                return boxToTransportPosition.warehouseId === warehouseId;
            });
            boxToTransport.boxes.push({ boxId, position });
            const box = { warehouseId, boxId, position };
            const action = { actionName: 'add', box };
            exports.pubSub.publish('boxesToTransportPosition', {
                boxesToTransportPosition: action,
            });
        };
        this.removeBoxToTransport = (warehouseId, boxId) => {
            console.log('removeBoxToTransport');
            const box = { warehouseId, boxId, position: null };
            const action = { actionName: 'remove', box };
            const boxToTransport = this.boxesToTransportPositions.find((boxToTransportPosition) => {
                return boxToTransportPosition.warehouseId === warehouseId;
            });
            const boxToSave = boxToTransport.boxes.find((box) => {
                return box.boxId === boxId;
            });
            const boxToDeleteIndex = boxToTransport.boxes.indexOf(boxToSave);
            if (boxToDeleteIndex !== -1) {
                boxToTransport.boxes.splice(boxToDeleteIndex, 1);
            }
            exports.pubSub.publish('boxesToTransportPosition', {
                boxesToTransportPosition: action,
            });
        };
        this.initTransportSubstrateInWarehouses();
    }
    async createWarehouse(warehouseGroupId) {
        const createdWarehouse = new this.warehouseModel({
            _id: new mongoose_1.Types.ObjectId(),
            warehouseGroup: warehouseGroupId,
        });
        return createdWarehouse.save();
    }
    async findAllWarehouses() {
        return this.warehouseModel
            .find()
            .populate('boxes')
            .populate('warehouseGroup')
            .exec();
    }
    async findByIDWarehouse(id) {
        return this.warehouseModel
            .findOne({ _id: id })
            .populate('boxes')
            .populate('warehouseGroup')
            .exec();
    }
};
WarehousesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(warehouse_schema_1.Warehouse.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        boxes_service_1.BoxesService])
], WarehousesService);
exports.WarehousesService = WarehousesService;
//# sourceMappingURL=warehouses.service.js.map