import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BoxType } from 'src/boxes/dto/box.dto';

@ObjectType()
export class WarehouseType {
  @Field(() => ID)
  id: string;
  @Field(() => [BoxType]) boxes: BoxType[];
  // @Field(() => WarehouseType, { nullable: true }) warehouse: WarehouseType;
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
