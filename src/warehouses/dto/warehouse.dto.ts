import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BoxType } from 'src/boxes/dto/box.dto';
import { WarehouseGroupType } from 'src/warehouses-group/dto/warehouses-group.dto';

@ObjectType()
export class WarehouseType {
  @Field(() => ID)
  id: string;
  @Field(() => [BoxType]) boxes: BoxType[];
  @Field(() => WarehouseGroupType)
  warehouseGroup: WarehouseGroupType;
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
