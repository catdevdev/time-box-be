import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { WarehouseType } from './dto/warehouse.dto';
import { WarehouseInput } from './inputs/warehouse.input';
import { WarehousesService } from './warehouses.service';

import { PubSub } from 'graphql-subscriptions';
// import { Subscription } from 'rxjs';

type Vertor3 = { x: number; y: number; z: number };

let Transport = {};

const pubSub = new PubSub();

const positionsBoxes = [
  {
    position: { x: 0, y: 0, z: 0 },
  },
];

@Resolver()
export class WarehousesResolver {
  constructor(private warehousesService: WarehousesService) {}

  @Query(() => [WarehouseType])
  async warehouses() {
    return this.warehousesService.findAll();
  }

  @Query(() => [WarehouseType])
  async warehouse(@Args('name') input: string) {
    return this.warehousesService.findByName(input);
  }

  @Mutation(() => WarehouseType)
  async createdWarehouse(@Args('input') input: WarehouseInput) {
    // pubSub.publish()

    return this.warehousesService.create(input);
  }

  @Subscription(() => Number)
  async warehoused() {
    return this.warehousesService.findAll();
  }
}
