import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class BoxInput {
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  warehouse: string;
  @Field()
  user: string;
}
