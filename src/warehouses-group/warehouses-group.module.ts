import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  WarehouseGroup,
  WarehouseGroupSchema,
} from './schemas/warehouses-group.schema';
import { WarehouseGroupResolver } from './warehouses-group.resolver';
import { WarehousesGroupService } from './warehouses-group.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WarehouseGroup.name, schema: WarehouseGroupSchema },
    ]),
  ],
  providers: [WarehouseGroupResolver, WarehousesGroupService],
})
export class WarehouseGroupsModule {}
