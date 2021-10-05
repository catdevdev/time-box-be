import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesResolver } from './warehouses.resolver';

@Module({
  providers: [WarehousesService, WarehousesResolver]
})
export class WarehousesModule {}
