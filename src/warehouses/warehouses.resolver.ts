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
import { MoveTransportInput, WarehouseInput } from './inputs/warehouse.input';
import { WarehousesService } from './warehouses.service';

import { PubSub } from 'graphql-subscriptions';
import {
  pubSub,
  TransportSubstrateService,
} from './transportSubstrate.service';
import {
  BoxPositionType,
  TransportSubstrateType,
} from './dto/transportSubstrate.dto';

@Resolver()
export class WarehousesResolver {
  constructor(
    private warehousesService: WarehousesService,
    private transportSubstrate: TransportSubstrateService,
  ) {}

  @Query(() => [WarehouseType])
  async warehouses() {
    return this.warehousesService.findAll();
  }

  @Query(() => [WarehouseType])
  async warehouse(@Args('id') input: string) {
    return this.warehousesService.findByID(input);
  }

  @Query(() => [BoxPositionType])
  async boxPositions() {
    return this.transportSubstrate.positionsPlacements;
  }

  @Query(() => [TransportSubstrateType])
  async transportSubstratePositions() {
    return this.transportSubstrate.transportSubstratePositions;
  }

  @Query(() => TransportSubstrateType)
  async transportSubstratePosition(@Args('warehouseId') warehouseId: string) {
    return this.transportSubstrate.transportSubstratePosition(warehouseId);
  }

  @Mutation(() => WarehouseType)
  async createdWarehouse(@Args('input') input: WarehouseInput) {
    return this.warehousesService.create(input);
  }

  @Subscription(() => TransportSubstrateType, {
    filter: (payload, variables) => {
      return payload.moveTransport.warehouseId === variables.input.warehouseId;
    },
  })
  moveTransport(@Args('input') input: MoveTransportInput) {
    return pubSub.asyncIterator('transportPosition');
  }

  @Query(() => String)
  async testOdessa () {
    await this.transportSubstrate.putBoxIntoWarehouse('61619e0c301f12dbc8457fd4', 5, {
      x: -4,
      y: 0.1,
      z: 5,
    });
    await this.transportSubstrate.unloadBoxFromWarehouse('61619e0c301f12dbc8457fd4', 5, {
      x: -4,
      y: 0.1,
      z: 7,
    });
    return 'test move';
  }
  @Query(() => String)
  async testKyiv () {
    await this.transportSubstrate.putBoxIntoWarehouse('6168c3ca4558383d637331f8', 5, {
      x: -4,
      y: 0.1,
      z: 5,
    });
    await this.transportSubstrate.unloadBoxFromWarehouse('6168c3ca4558383d637331f8', 5, {
      x: -4,
      y: 0.1,
      z: 7,
    });
    return 'test move';
  }
}
