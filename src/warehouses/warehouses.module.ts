import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesResolver } from './warehouses.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Warehouse, WarehouseSchema } from './schemas/warehouse.schema';
import { TransportSubstrateService } from './transportSubstrate.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Warehouse.name, schema: WarehouseSchema },
    ]),
  ],
  providers: [TransportSubstrateService, WarehousesService, WarehousesResolver],
})
export class WarehousesModule {}
