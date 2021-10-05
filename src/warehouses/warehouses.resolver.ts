import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WarehouseType } from './dto/warehouse.dto';
import { WarehouseInput } from './inputs/warehouse.input';
import { WarehousesService } from './warehouses.service';

@Resolver()
export class WarehousesResolver {
  constructor(private warehousesService: WarehousesService) {}

  @Query(() => String)
  async hello() {
    return 'Hello 45!';
  }
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
    console.log(input);
    return this.warehousesService.create(input);
  }
}
