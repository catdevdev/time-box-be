import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class BoxInput {
  @Field()
  readonly name: string;
  @Field(() => Int)
  readonly age: string;
  @Field()
  readonly breed: string;
}
