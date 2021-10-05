import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BoxType {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  description: string;
}
