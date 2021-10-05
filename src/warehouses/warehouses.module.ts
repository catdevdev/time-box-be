import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesResolver } from './warehouses.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Warehouse, WarehouseSchema } from './schemas/warehouse.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Warehouse.name, schema: WarehouseSchema },
    ]),
  ],
  providers: [WarehousesService, WarehousesResolver],
})
export class WarehousesModule {}
