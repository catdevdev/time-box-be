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
  MoveTransportInput,
  PutBoxIntoWarehouseInput,
} from './inputs/warehouse.input';
import { pubSub, WarehousesService } from './warehouses.service';

import {
  BoxPositionType,
  TransportSubstrateType,
} from './dto/transportSubstrate.dto';
import { WarehouseGroupInput } from 'src/warehouses-group/inputs/warehouses-group.input';
import { WarehouseGroupType } from 'src/warehouses-group/dto/warehouses-group.dto';
import { positionsPlacements } from './variables';
import { Types } from 'mongoose';
import { Warehouse } from './schemas/warehouse.schema';

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
  async boxPositions() {
    return positionsPlacements;
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

  @Query(() => WarehouseType)
  async putBoxIntoWarehouse(
    @Args('putBoxIntoWarehouseInput')
    putBoxIntoWarehouseInput: PutBoxIntoWarehouseInput,
  ) {
    const freeWarehouse =
      await this.warehousesService.getFreeWarehouseByWarehouseGroupId(
        putBoxIntoWarehouseInput.warehouseGroupId,
      );
    console.log(putBoxIntoWarehouseInput);
    this.warehousesService.putBoxIntoWarehouse(
      freeWarehouse._id.toString(),
      putBoxIntoWarehouseInput.boxId,
      putBoxIntoWarehouseInput.seconds,
    );

    return freeWarehouse;
  }
}
