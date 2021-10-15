import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class BoxInput {
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  user: string;
}

@InputType()
export class AddPlacementForBoxInput {
  @Field()
  boxId: string;
  @Field()
  placement: number;
  @Field()
  warehouseId: string;
}
