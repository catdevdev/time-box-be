import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BoxType } from 'src/boxes/dto/box.dto';

@ObjectType()
export class PositionType {
  @Field()
  x: number;
  @Field()
  y: number;
  @Field()
  z: number;
}

@ObjectType()
export class BoxPositionType {
  @Field(() => PositionType)
  position: PositionType;
}

@ObjectType()
export class TransportSubstrateType {
  @Field(() => PositionType)
  position: PositionType;
  @Field()
  warehouseId: string;
  @Field()
  speed: number;
}