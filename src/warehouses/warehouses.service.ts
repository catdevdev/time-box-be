import { Model, ObjectId, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Warehouse, WarehouseDocument } from './schemas/warehouse.schema';
import { nanoid } from 'nanoid';
import { Vector3 } from 'src/types';
import { PubSub } from 'graphql-subscriptions';
import { positionsPlacements } from './variables';
import { BoxesService } from 'src/boxes/boxes.service';
import { Box } from 'src/boxes/schemas/box.schema';
import { randomInt } from 'crypto';

type Action =
  | {
      name: 'loadBox';
      boxId: string;
      seconds: number;
    }
  | {
      name: 'unload';
      boxId: string;
    };

export const pubSub = new PubSub();

const MAX_CAPACITY_WAREHOUSE = 160;

function shuffle<T>(array: T[]) {
  let currentIndex = array.length,
    randomIndex: number;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

@Injectable()
export class WarehousesService {
  constructor(
    @InjectModel(Warehouse.name)
    private warehouseModel: Model<WarehouseDocument>,
    private boxesService: BoxesService,
  ) {
    this.initTransportSubstrateInWarehouses();
  }

  async createWarehouse(warehouseGroupId: string): Promise<Warehouse> {
    const createdWarehouse = new this.warehouseModel({
      _id: new Types.ObjectId(),
      warehouseGroup: warehouseGroupId,
    });

    return createdWarehouse.save();
  }

  async findAllWarehouses(): Promise<Warehouse[]> {
    return this.warehouseModel
      .find()
      .populate('boxes')
      .populate('warehouseGroup')
      .exec();
  }

  async findByIDWarehouse(id: string): Promise<Warehouse> {
    return this.warehouseModel
      .findOne({ _id: id })
      .populate('boxes')
      .populate('warehouseGroup')
      .exec();
  }

  public putBoxIntoWarehouse = async (
    warehouseId: string,
    boxId: string,
    seconds: number,
  ) => {
    const warehouse = await this.findByIDWarehouse(warehouseId);
    const incomingBoxPosition = {
      x: randomInt(-4, 4),
      y: 0.2,
      z: randomInt(3, 5),
    };

    this.addBoxToTransport(warehouseId, boxId, incomingBoxPosition);

    const busyPlacements: number[] = [];
    warehouse.boxes.map(({ placement }) => {
      busyPlacements.push(placement);
    });
    const freePlacements: number[] = [];
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

    const placementIndex =
      freePlacements[Math.floor(Math.random() * freePlacements.length)];

    await this.goToOusideBoxFromStartedPosition(
      warehouseId,
      incomingBoxPosition,
    );
    this.loadBoxOnSubstrate(warehouseId);

    this.removeBoxToTransport(warehouseId, boxId);
    await this.goToStartedPositionFromOusideBox(warehouseId);
    await this.goToPlacementPositionFromStartedPosition(
      warehouseId,
      placementIndex,
    );
    await this.boxesService.addPlacementForBox(
      boxId,
      placementIndex,
      warehouseId,
    );
    await this.boxesService.closeBoxForTime(boxId, seconds);
    this.addBoxToTransport(
      warehouseId,
      boxId,
      positionsPlacements[placementIndex].position,
    );
    this.unloadBoxFromSubstrate(warehouseId);

    await this.goToStartedPositionFromPlacementPosition(warehouseId);
  };

  public unloadBoxFromWarehouse = async (
    warehouseId: string,
    boxId: string,
    boxPlacementIndex: number,
  ) => {
    const boxPositionOutside = {
      x: randomInt(-4, 4),
      y: 0.2,
      z: randomInt(3, 5),
    };
    await this.goToPlacementPositionFromStartedPosition(
      warehouseId,
      boxPlacementIndex,
    );
    this.removeBoxToTransport(warehouseId, boxId);
    this.loadBoxOnSubstrate(warehouseId);
    await this.goToStartedPositionFromPlacementPosition(warehouseId);
    await this.goToOusideBoxFromStartedPosition(
      warehouseId,
      boxPositionOutside,
    );
    await this.boxesService.unloadBox(boxId);
    this.unloadBoxFromSubstrate(warehouseId);
    this.addBoxToTransport(warehouseId, boxId, boxPositionOutside);
    await this.goToStartedPositionFromOusideBox(warehouseId);
  };

  getBoxesPosition = async (warehouseId: string) => {
    const result = await this.warehouseModel
      .findById(warehouseId)
      .populate('boxes')
      .exec();
    const positions = result.boxes.map((box) => {
      return {
        boxId: box._id,
        position: positionsPlacements[box.placement].position,
      };
    });

    // const a = positionsPlacements[result.boxes.]

    return positions;
  };

  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  getFreeWarehouseByWarehouseGroupId = async (
    warehouseGroupId: string,
  ): Promise<Warehouse> => {
    const warehouses = await this.findAllWarehouses();
    const warehousesByWarehouseGroup = warehouses.filter(
      ({ warehouseGroup }) => {
        console.log(warehouseGroup);
        return warehouseGroup._id.toString() === warehouseGroupId;
      },
    );
    console.log('warehouseGroupId');
    console.log(warehouseGroupId);
    console.log('warehouses');
    console.log(warehouses);
    console.log('warehousesByWarehouseGroup');
    console.log(warehousesByWarehouseGroup);

    const freeWarehouse = shuffle(warehousesByWarehouseGroup).find(
      (warehouse) => {
        return warehouse.boxes.length < MAX_CAPACITY_WAREHOUSE;
      },
    );
    console.log('freeWarehouse');
    console.log(freeWarehouse);
    if (!freeWarehouse) {
      const createWarehousePromises = [];
      Array.from(Array(2)).forEach(() => {
        createWarehousePromises.push(this.createWarehouse(warehouseGroupId));
      });
      const newWarehouses: Warehouse[] = await Promise.all(
        createWarehousePromises,
      );
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
      const warehousesByWarehouseGroup = warehouses.filter(
        ({ warehouseGroup }) =>
          warehouseGroup._id.toString() === warehouseGroupId,
      );

      return shuffle(warehousesByWarehouseGroup).find((warehouse) => {
        return warehouse.boxes.length < MAX_CAPACITY_WAREHOUSE;
      });
    } else {
      return freeWarehouse;
    }
  };

  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  startedPosition: Vector3 = { x: 0, y: 0.02, z: 2.1 };

  transportSubstratePositions: {
    warehouseId: string;
    position: Vector3;
    boxOnSubstrate: boolean;
  }[] = [];

  boxesToTransportPositions: {
    warehouseId: string;
    boxes: { boxId: string; position: Vector3 }[];
  }[] = [];

  warehouseQueues: {
    isActive: boolean;
    warehouseId: string;
    actions: Action[];
  }[] = [];

  public addToQueue = (warehouseId: string, action: Action) => {
    const warehouseQueue = this.warehouseQueues.find((warehouseQueue) => {
      return warehouseQueue.warehouseId === warehouseId;
    });

    warehouseQueue.actions.push(action);

    if (warehouseQueue.isActive === false) {
      this.performQueue(warehouseId);
    }
  };

  private performQueue = async (warehouseId: string) => {
    const warehouseQueue = this.warehouseQueues.find((warehouseQueue) => {
      return warehouseQueue.warehouseId === warehouseId;
    });
    if (warehouseQueue.actions.length === 0) {
      warehouseQueue.isActive = false;
      return;
    }

    warehouseQueue.isActive = true;
    if (warehouseQueue.actions[0].name === 'loadBox') {
      await this.putBoxIntoWarehouse(
        warehouseQueue.warehouseId,
        warehouseQueue.actions[0].boxId,
        warehouseQueue.actions[0].seconds,
      );
    }
    if (warehouseQueue.actions[0].name === 'unload') {
      const box = await this.boxesService.findBoxById(
        warehouseQueue.actions[0].boxId,
      );
      await this.unloadBoxFromWarehouse(
        warehouseQueue.warehouseId,
        warehouseQueue.actions[0].boxId,
        box.placement,
      );
    }
    warehouseQueue.actions.shift();
    this.performQueue(warehouseId);
  };

  initTransportSubstrateInWarehouses = async () => {
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

  addTransportSubstrate = (warehouseId: string) => {
    this.transportSubstratePositions.push({
      warehouseId,
      position: this.startedPosition,
      boxOnSubstrate: false,
    });
  };

  transportSubstratePosition = (warehouseId: string) => {
    return this.transportSubstratePositions.find(
      (transportSubstratePosition) =>
        transportSubstratePosition.warehouseId === warehouseId,
    );
  };

  private moveTransport = (warehouseId: string, to: Vector3) => {
    const speed = 0.8;

    const {
      x: transportSubstrateX,
      y: transportSubstrateY,
      z: transportSubstrateZ,
    } = this.transportSubstratePosition(warehouseId).position;
    const { x: toX, y: toY, z: toZ } = to;
    const { sqrt, pow } = Math;
    const distance = sqrt(
      pow(transportSubstrateX - toX, 2) +
        pow(transportSubstrateY - toY, 2) +
        pow(transportSubstrateZ - toZ, 2),
    );

    const transportSubstratePositionIndex =
      this.transportSubstratePositions.findIndex(
        (transportSubstratePosition) =>
          transportSubstratePosition.warehouseId === warehouseId,
      );
    this.transportSubstratePositions[transportSubstratePositionIndex].position =
      to;

    pubSub.publish('transportPosition', {
      moveTransport: {
        position:
          this.transportSubstratePositions[transportSubstratePositionIndex]
            .position,
        warehouseId:
          this.transportSubstratePositions[transportSubstratePositionIndex]
            .warehouseId,
        speed,
        boxOnSubstrate:
          this.transportSubstratePositions[transportSubstratePositionIndex]
            .boxOnSubstrate,
      },
    });
    const delay = 0;
    const time = (distance * 1100 + delay) / speed;

    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  };

  private loadBoxOnSubstrate = (warehouseId: string) => {
    this.transportSubstratePosition(warehouseId).boxOnSubstrate = true;
  };

  private unloadBoxFromSubstrate = (warehouseId: string) => {
    this.transportSubstratePosition(warehouseId).boxOnSubstrate = false;
  };

  private goToOusideBoxFromStartedPosition = async (
    warehouseId: string,
    positionIncomeBox: Vector3,
  ) => {
    const { x, y, z } = positionIncomeBox;
    const { position } = this.transportSubstratePosition(warehouseId);
    await this.moveTransport(warehouseId, {
      x: position.x,
      y: this.startedPosition.y,
      z,
    });
    await this.moveTransport(warehouseId, { x, y: this.startedPosition.y, z });
  };

  private goToStartedPositionFromOusideBox = async (warehouseId: string) => {
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

  private goToPlacementPositionFromStartedPosition = async (
    warehouseId: string,
    placementIndex: number,
  ) => {
    const positionsPlacement = positionsPlacements[placementIndex].position;
    const { position: transportSubstratePosition } =
      this.transportSubstratePosition(warehouseId);
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

  private goToStartedPositionFromPlacementPosition = async (
    warehouseId: string,
  ) => {
    const { position: transportSubstratePosition } =
      this.transportSubstratePosition(warehouseId);
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

  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  public boxesToTransport = (warehouseId: string) => {
    const boxToTransport = this.boxesToTransportPositions.find(
      (boxToTransportPosition) => {
        return boxToTransportPosition.warehouseId === warehouseId;
      },
    );
    return boxToTransport;
  };

  private addBoxToTransport = (
    warehouseId: string,
    boxId: string,
    position: Vector3,
  ) => {
    const boxToTransport = this.boxesToTransportPositions.find(
      (boxToTransportPosition) => {
        return boxToTransportPosition.warehouseId === warehouseId;
      },
    );
    boxToTransport.boxes.push({ boxId, position });

    const box = { warehouseId, boxId, position };
    const action = { actionName: 'add', box };
    pubSub.publish('boxesToTransportPosition', {
      boxesToTransportPosition: action,
    });
  };

  private removeBoxToTransport = (warehouseId: string, boxId: string) => {
    console.log('removeBoxToTransport');
    const box = { warehouseId, boxId, position: null };
    const action = { actionName: 'remove', box };

    const boxToTransport = this.boxesToTransportPositions.find(
      (boxToTransportPosition) => {
        return boxToTransportPosition.warehouseId === warehouseId;
      },
    );
    const boxToSave = boxToTransport.boxes.find((box) => {
      return box.boxId === boxId;
    });

    const boxToDeleteIndex = boxToTransport.boxes.indexOf(boxToSave);
    if (boxToDeleteIndex !== -1) {
      boxToTransport.boxes.splice(boxToDeleteIndex, 1);
    }

    pubSub.publish('boxesToTransportPosition', {
      boxesToTransportPosition: action,
    });
  };
}
