import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateCatDto {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field(() => Int)
  age: string;
  @Field()
  breed: string;
}
