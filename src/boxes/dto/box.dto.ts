import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BoxType {
  @Field(() => ID)
  _id: string;
  @Field()
  name: string;
  @Field(() => Int)
  description: string;
}
