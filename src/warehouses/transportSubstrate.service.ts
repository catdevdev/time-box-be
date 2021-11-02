import { Injectable } from '@nestjs/common';
import { ChildProcess } from 'child_process';
import { PubSub } from 'graphql-subscriptions';
import { WarehousesService } from './warehouses.service';

type Vector3 = { x: number; y: number; z: number };

let transportSubstratePositions: { warehouseId: string; position: Vector3 }[] =
  [];

const WAREHOUSE_MAX_CAPICITY = 160

export const pubSub = new PubSub();

@Injectable()
export class TransportSubstrateService {
  constructor(private warehousesService: WarehousesService) {
    this.fillTransportSubstratePositions();
    this.processWarehouse();
  }

  private processWarehouseGroups = async () => {
    const warehouseGroups = await this.warehousesService.findAllWarehouses();
    warehouseGroups.map(({_id}) => {
      this.processWarehouseGroup(_id)
    });
    this.fillTransportSubstratePositions()
    // this.warehousesService.createWarehouse();
  };

  private processWarehouseGroup = (warehouseGroupId: string) => {
    this.warehousesService.findAllWarehouses;
  };

  startedPosition: Vector3 = { x: 0, y: 0.1, z: 2.1 };

  transportSubstratePositions = transportSubstratePositions;
  fillTransportSubstratePositions = async () => {
    const warehouses = await this.warehousesService.findAllWarehouses();
    console.log(warehouses);
    warehouses.map(({ _id }) => {
      transportSubstratePositions.push({
        warehouseId: _id,
        position: this.startedPosition,
      });
    });
  };

  transportSubstratePosition = (warehouseId: string) => {
    return transportSubstratePositions.find(
      (transportSubstratePosition) =>
        transportSubstratePosition.warehouseId === warehouseId,
    );
  };

  private moveTransport = (warehouseId: string, to: Vector3) => {
    // const transportSubstratePosition = transportSubstratePositions.find(
    //   (transportSubstratePosition) =>
    //     transportSubstratePosition.warehouseId === warehouseId,
    // );
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
      transportSubstratePositions.findIndex(
        (transportSubstratePosition) =>
          transportSubstratePosition.warehouseId === warehouseId,
      );
    transportSubstratePositions[transportSubstratePositionIndex].position = to;

    pubSub.publish('transportPosition', {
      moveTransport: {
        position:
          transportSubstratePositions[transportSubstratePositionIndex].position,
        warehouseId:
          transportSubstratePositions[transportSubstratePositionIndex]
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

  public putBoxIntoWarehouse = async (
    warehouseId: string,
    placementIndex: number,
    incomingBoxPosition: Vector3,
  ) => {
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

  private goToOusideBoxFromStartedPosition = async (
    warehouseId: string,
    positionIncomeBox: Vector3,
  ) => {
    const { x, y, z } = positionIncomeBox;
    const { position } = this.transportSubstratePosition(warehouseId);
    await this.moveTransport(warehouseId, { x: position.x, y, z });
    await this.moveTransport(warehouseId, { x, y, z });
  };

  private goToStartedPositionFromOusideBox = async (warehouseId: string) => {
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

  private goToPlacementPositionFromStartedPosition = async (
    warehouseId: string,
    placementIndex: number,
  ) => {
    const positionsPlacement =
      this.positionsPlacements[placementIndex].position;
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

  public unloadBoxFromWarehouse = async (
    warehouseId: string,
    placementIndex: number,
    boxPositionOutside: Vector3,
  ) => {
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

  positionsPlacements = [
    {
      position: { x: -0.9, y: 0.2, z: 2.15 },
    },
    {
      position: { x: -1.4, y: 0.2, z: 2.15 },
    },
    {
      position: { x: -1.9, y: 0.2, z: 2.15 },
    },
    {
      position: { x: -2.4, y: 0.2, z: 2.15 },
    },
    //
    {
      position: { x: -0.9, y: 0.72, z: 2.15 },
    },
    {
      position: { x: -1.4, y: 0.72, z: 2.15 },
    },
    {
      position: { x: -1.9, y: 0.72, z: 2.15 },
    },
    {
      position: { x: -2.4, y: 0.72, z: 2.15 },
    },
    //
    {
      position: { x: -0.9, y: 1.2, z: 2.15 },
    },
    {
      position: { x: -1.4, y: 1.2, z: 2.15 },
    },
    {
      position: { x: -1.9, y: 1.2, z: 2.15 },
    },
    {
      position: { x: -2.4, y: 1.2, z: 2.15 },
    },
    //
    {
      position: { x: -0.9, y: 1.7, z: 2.15 },
    },
    {
      position: { x: -1.4, y: 1.7, z: 2.15 },
    },
    {
      position: { x: -1.9, y: 1.7, z: 2.15 },
    },
    {
      position: { x: -2.4, y: 1.7, z: 2.15 },
    },
    //
    {
      position: { x: -0.9, y: 2.2, z: 2.15 },
    },
    {
      position: { x: -1.4, y: 2.2, z: 2.15 },
    },
    {
      position: { x: -1.9, y: 2.2, z: 2.15 },
    },
    {
      position: { x: -2.4, y: 2.2, z: 2.15 },
    },
  ];
}
