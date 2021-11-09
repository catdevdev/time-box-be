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
    return this.warehousesService.getBoxesPosition(warehouseId);
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
        payload.boxesToTransportPosition.warehouseId ===
        variables.input.warehouseId
      );
    },
  })
  boxesToTransportPosition(@Args('input') input: BoxStatusInput) {
    return pubSub.asyncIterator('boxesToTransportPosition');
  }

  @Query(() => GroupBoxesToTransportType)
  boxToTransport(@Args('warehouseId') warehouseId: string) {
    const boxToTransport = this.warehousesService.boxToTransport(warehouseId);
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
}
