import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class BoxInput {
  @Field()
  name: string;
  @Field()
  description: string;
}
