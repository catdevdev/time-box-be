import { Model, ObjectId, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Warehouse, WarehouseDocument } from './schemas/warehouse.schema';
import { nanoid } from 'nanoid';
import { Vector3 } from 'src/types';
import { PubSub } from 'graphql-subscriptions';
import { positionsPlacements } from './variables';

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
  ) {
    this.initTransportSubstrateInWarehouses();
  }

  async createWarehouse(warehouseGroupId: string): Promise<Warehouse> {
    console.log(warehouseGroupId);
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
    return this.warehouseModel.findOne({ _id: id }).exec();
  }

  public putBoxIntoWarehouse = async (
    warehouseId: string,
    placementIndex: number,
  ) => {
    const incomingBoxPosition = {
      x: -4,
      y: 0.1,
      z: 5,
    };
    await this.goToOusideBoxFromStartedPosition(
      warehouseId,
      incomingBoxPosition,
    );
    await this.goToStartedPositionFromOusideBox(warehouseId);
    await this.goToPlacementPositionFromStartedPosition(
      warehouseId,
      placementIndex,
    );
    await this.goToStartedPositionFromPlacementPosition(warehouseId);
  };

  unloadBoxFromWarehouse = async (
    warehouseId: string,
    placementIndex: number,
  ) => {
    const boxPositionOutside: Vector3 = {
      x: -4,
      y: 0.1,
      z: 5,
    };
    await this.goToPlacementPositionFromStartedPosition(
      warehouseId,
      placementIndex,
    );
    await this.goToStartedPositionFromPlacementPosition(warehouseId);
    await this.goToOusideBoxFromStartedPosition(
      warehouseId,
      boxPositionOutside,
    );
    await this.goToStartedPositionFromOusideBox(warehouseId);
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
      ({ warehouseGroup }) =>
        warehouseGroup._id.toString() === warehouseGroupId,
    );

    const freeWarehouse = shuffle(warehousesByWarehouseGroup).find(
      (warehouse) => {
        return warehouse.boxes.length < MAX_CAPACITY_WAREHOUSE;
      },
    );
    if (!freeWarehouse) {
      const createWarehousePromises = [];
      Array.from(Array(10)).forEach(() => {
        createWarehousePromises.push(this.createWarehouse(warehouseGroupId));
      });
      const newWarehouses: Warehouse[] = await Promise.all(
        createWarehousePromises,
      );
      newWarehouses.forEach((warehouse) => {
        this.addTransportSubstrate(warehouse._id);
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

  startedPosition: Vector3 = { x: 0, y: 0.1, z: 2.1 };

  transportSubstratePositions: { warehouseId: string; position: Vector3 }[] =
    [];

  initTransportSubstrateInWarehouses = async () => {
    const warehouses = await this.findAllWarehouses();

    warehouses.map(({ _id }) => {
      this.transportSubstratePositions.push({
        warehouseId: _id.toString(),
        position: this.startedPosition,
      });
    });
  };

  addTransportSubstrate = (warehouseId) => {
    this.transportSubstratePositions.push({
      warehouseId,
      position: this.startedPosition,
    });
  };

  transportSubstratePosition = (warehouseId: string) => {
    return this.transportSubstratePositions.find(
      (transportSubstratePosition) =>
        transportSubstratePosition.warehouseId === warehouseId,
    );
  };

  private moveTransport = (warehouseId: string, to: Vector3) => {
    const speed = 1;

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
      },
    });
    const delay = 0;
    const time = (distance * 1100 + delay) / speed;
    console.log(time);

    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  };

  goToOusideBoxFromStartedPosition = async (
    warehouseId: string,
    positionIncomeBox: Vector3,
  ) => {
    const { x, y, z } = positionIncomeBox;
    const { position } = this.transportSubstratePosition(warehouseId);
    await this.moveTransport(warehouseId, { x: position.x, y, z });
    await this.moveTransport(warehouseId, { x, y, z });
  };

  goToStartedPositionFromOusideBox = async (warehouseId: string) => {
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

  goToPlacementPositionFromStartedPosition = async (
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

  goToStartedPositionFromPlacementPosition = async (warehouseId: string) => {
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
}
