import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
// import { Warehouse } from 'src/warehouses/schemas/warehouse.schema';
import * as mongoose from 'mongoose';
import { UserType } from 'src/users/dto/user.dto';
import { User } from 'src/users/schemas/user.schema';
import { WarehouseType } from 'src/warehouses/dto/warehouse.dto';

@ObjectType()
export class BoxType {
  @Field(() => ID) id: string;
  @Field() name: string;
  @Field() description: string;
  @Field(() => [String]) imageIds: string[];
  @Field(() => [String]) notes: string[];
  @Field({ nullable: true }) placement: number;
  @Field(() => WarehouseType, { nullable: true }) warehouse: WarehouseType;
  @Field(() => UserType) user: UserType;
}
