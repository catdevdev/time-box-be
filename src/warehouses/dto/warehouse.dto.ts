import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

export type Coordinates = { longitude: number; latitude: number };

@ObjectType()
export class WarehouseType {
  @Field(() => ID)
  _id: string;
  @Field()
  name: string;
  @Field()
  coordinates: Coordinates;
}
