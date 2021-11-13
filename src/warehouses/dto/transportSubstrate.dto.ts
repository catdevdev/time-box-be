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
  @Field()
  boxId: string;
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
  boxOnSubstrate: boolean;
  @Field()
  speed: number;
}

@ObjectType()
export class BoxToTransportType {
  @Field()
  warehouseId: string;
  @Field(() => PositionType, { nullable: true })
  position: PositionType;
  @Field()
  boxId: string;
}

@ObjectType()
export class GroupBoxesToTransportType {
  @Field()
  actionName: string;
  @Field(() => BoxToTransportType)
  box: BoxToTransportType;
}
