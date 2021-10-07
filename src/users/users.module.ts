import { Module } from '@nestjs/common';
import { WarehousesService } from './users.service';
import { WarehousesResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Warehouse, WarehouseSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Warehouse.name, schema: WarehouseSchema },
    ]),
  ],
  providers: [WarehousesService, WarehousesResolver],
})
export class UsersModule {}
