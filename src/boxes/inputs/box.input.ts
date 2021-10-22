import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class BoxInput {
  @Field()
  name: string;
  @Field()
  description: string;
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

@InputType()
export class AddNoteIntoBoxInput {
  @Field()
  boxId: string;
  @Field()
  note: string;
}
