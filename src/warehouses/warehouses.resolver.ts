import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WarehouseType } from './dto/warehouse.dto';
import { WarehouseInput } from './inputs/warehouse.input';
import { WarehousesService } from './warehouses.service';

@Resolver()
export class WarehousesResolver {
  constructor(private warehousesService: WarehousesService) {}

  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }
  @Query(() => [WarehouseType])
  async cats() {
    return this.warehousesService.findAll();
  }

  @Query(() => [WarehouseType])
  async cat(@Args('name') input: string) {
    return this.warehousesService.findByName(input);
  }

  @Mutation(() => WarehouseType)
  async createCat(@Args('input') input: WarehouseInput) {
    return this.warehousesService.create(input);
  }
}
