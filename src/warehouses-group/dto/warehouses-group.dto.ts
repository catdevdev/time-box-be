import { Field, ID, ObjectType } from '@nestjs/graphql';
import { WarehouseType } from 'src/warehouses/dto/warehouse.dto';
import { Warehouse } from 'src/warehouses/schemas/warehouse.schema';

@ObjectType()
class LocationType {
  @Field() latitude: number;
  @Field() longitude: number;
}

@ObjectType()
export class WarehouseGroupType {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field(() => LocationType)
  location: LocationType;
  @Field(() => [WarehouseType])
  warehouses: WarehouseType[];
} 
