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
  @Field()
  name: string;
  @Field(() => Location)
  location: Location;
  @Field(() => [BoxType]) boxes: BoxType[];
}
