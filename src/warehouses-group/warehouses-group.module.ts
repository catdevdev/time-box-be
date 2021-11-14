import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WarehousesModule } from 'src/warehouses/warehouses.module';
import { WarehousesService } from 'src/warehouses/warehouses.service';
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
    WarehousesModule,
  ],
  providers: [WarehouseGroupResolver, WarehousesGroupService],
})
export class WarehouseGroupsModule {}
