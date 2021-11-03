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
