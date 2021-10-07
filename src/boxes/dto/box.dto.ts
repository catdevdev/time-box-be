import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
// import { Warehouse } from 'src/warehouses/schemas/warehouse.schema';
import * as mongoose from 'mongoose';
import { WarehouseType } from 'src/warehouses/dto/warehouse.dto';

@ObjectType()

@ObjectType()
export class BoxType {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  description: string;
  @Field(() => WarehouseType)
  warehouse: WarehouseType;
}
