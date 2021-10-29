import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BoxType } from 'src/boxes/dto/box.dto';

@ObjectType()
class Location {
  @Field() latitude: number;
  @Field() longitude: number;
}

@ObjectType()
export class WarehouseType {
  @Field(() => ID)
  id: string; 
  @Field(() => [BoxType]) boxes: BoxType[];
}
@ObjectType()
export class WarehouseGroupType {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field(() => Location)
  location: Location;
}

@ObjectType()
export class PositionType {
  @Field()
  x: number;
  @Field()
  y: number;
  @Field()
  z: number;
}
