import {
  Args,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { WarehouseType } from './dto/warehouse.dto';
import {
  BoxStatusInput,
  MoveTransportInput,
  PutBoxIntoWarehouseInput,
  UnloadBoxFromWarehouseInput,
} from './inputs/warehouse.input';
import { pubSub, WarehousesService } from './warehouses.service';

import {
  BoxPositionType,
  GroupBoxesToTransportType,
  TransportSubstrateType,
} from './dto/transportSubstrate.dto';

@Resolver()
export class WarehousesResolver {
  constructor(private warehousesService: WarehousesService) {}

  @Query(() => [WarehouseType])
  async warehouses() {
    return this.warehousesService.findAllWarehouses();
  }

  @Query(() => [WarehouseType])
  async warehouse(@Args('id') input: string) {
    return this.warehousesService.findByIDWarehouse(input);
  }

  @Query(() => [BoxPositionType])
  async boxesPosition(@Args('warehouseId') warehouseId: string) {
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

  @Query(() => WarehouseType)
  async freeWarehouseByWarehouseGroupId(@Args('id') warehouseGroupId: string) {
    return this.warehousesService.getFreeWarehouseByWarehouseGroupId(
      warehouseGroupId,
    );
  }

  @Query(() => [TransportSubstrateType])
  async transportSubstratePositions() {
    return this.warehousesService.transportSubstratePositions;
  }

  @Query(() => TransportSubstrateType)
  async transportSubstratePosition(@Args('warehouseId') warehouseId: string) {
    return this.warehousesService.transportSubstratePosition(warehouseId);
  }

  @Mutation(() => WarehouseType)
  async createWarehouse(@Args('warehouseId') warehouseId: string) {
    return this.warehousesService.createWarehouse(warehouseId);
  }

  @Subscription(() => TransportSubstrateType, {
    filter: (payload, variables) => {
      return payload.moveTransport.warehouseId === variables.input.warehouseId;
    },
  })
  moveTransport(@Args('input') input: MoveTransportInput) {
    return pubSub.asyncIterator('transportPosition');
  }

  @Subscription(() => GroupBoxesToTransportType, {
    filter: (payload, variables) => {
      return (
        payload.boxesToTransportPosition.box.warehouseId ===
        variables.input.warehouseId
      );
    },
  })
  boxesToTransportPosition(@Args('input') input: BoxStatusInput) {
    return pubSub.asyncIterator('boxesToTransportPosition');
  }

  @Query(() => GroupBoxesToTransportType)
  boxToTransport(@Args('warehouseId') warehouseId: string) {
    const boxToTransport = this.warehousesService.boxesToTransport(warehouseId);
    console.log(boxToTransport);

    return {
      warehouseId: boxToTransport.warehouseId,
      boxes: boxToTransport.boxes,
    };
  }

  @Query(() => WarehouseType)
  async putBoxIntoWarehouse(
    @Args('putBoxIntoWarehouseInput')
    putBoxIntoWarehouseInput: PutBoxIntoWarehouseInput,
  ) {
    const freeWarehouse =
      await this.warehousesService.getFreeWarehouseByWarehouseGroupId(
        putBoxIntoWarehouseInput.warehouseGroupId,
      );
    // '6182bd69d3e985b09988f8ed'
    this.warehousesService.addToQueue(freeWarehouse._id.toString(), {
      name: 'loadBox',
      boxId: putBoxIntoWarehouseInput.boxId,
      seconds: putBoxIntoWarehouseInput.seconds,
    });
    return freeWarehouse;
  }

  @Query(() => WarehouseType)
  async unloadBoxFromWarehouse(
    @Args('unloadBoxFromWarehouseInput')
    unloadBoxFromWarehouseInput: UnloadBoxFromWarehouseInput,
  ) {
    this.warehousesService.addToQueue(unloadBoxFromWarehouseInput.warehouseId, {
      name: 'unload',
      boxId: unloadBoxFromWarehouseInput.boxId,
    });
    const warehouse = await this.warehousesService.findByIDWarehouse(
      unloadBoxFromWarehouseInput.warehouseId,
    );
    return warehouse;
  }
}
