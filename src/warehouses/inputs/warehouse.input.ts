import { Field, InputType } from '@nestjs/graphql';

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
