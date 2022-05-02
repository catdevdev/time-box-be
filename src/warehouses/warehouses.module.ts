import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesResolver } from './warehouses.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Warehouse, WarehouseSchema } from './schemas/warehouse.schema';
import { BoxesModule } from 'src/boxes/boxes.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Warehouse.name, schema: WarehouseSchema },
    ]),
    BoxesModule,
  ],
  providers: [WarehousesResolver, WarehousesService],
  exports: [WarehousesService],
})
export class WarehousesModule {}
