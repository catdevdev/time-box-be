import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

// @InputType()
// export class WarehouseInput {
//   @Field()
//   warehouseId: string;
// }

@InputType()
export class MoveTransportInput {
  @Field()
  warehouseId: string;
}
@InputType()
export class BoxStatusInput {
  @Field()
  warehouseId: string;
}

@InputType()
export class PutBoxIntoWarehouseInput {
  @Field()
  warehouseGroupId: string;
  @Field()
  boxId: string;
  @Field()
  seconds: number;
}
