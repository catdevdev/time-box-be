import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WarehouseGroupType } from './dto/warehouses-group.dto';
import { WarehouseGroupInput } from './inputs/warehouses-group.input';
import { WarehousesGroupService } from './warehouses-group.service';

@Resolver()
export class WarehouseGroupResolver {
  constructor(private warehousesGroupService: WarehousesGroupService) {}
  @Mutation(() => WarehouseGroupType)
  async createWarehousesGroup(
    @Args('warehouseGroupInput') warehouseGroupInput: WarehouseGroupInput,
  ) {
    return this.warehousesGroupService.createWarehouseGroup(
      warehouseGroupInput,
    );
  }

  @Query(() => [WarehouseGroupType])
  async warehouseGroups() {
    return this.warehousesGroupService.findAllWarehouseGroups();
    
  }

  @Query(() => WarehouseGroupType)
  async warehouseGroup(@Args('id') warehouseGroupId: string) {
    return this.warehousesGroupService.findByIDWarehouseGroup(warehouseGroupId);
  }
}
