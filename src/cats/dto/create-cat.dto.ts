import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CatType {
  @Field(() => ID)
  _id: string;
  @Field()
  name: string;
  @Field(() => Int)
  age: string;
  @Field()
  breed: string;
}
