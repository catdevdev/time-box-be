import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BoxType } from 'src/boxes/dto/box.dto';

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: string;
  @Field()
  role: string;
  @Field()
  username: string;
  @Field(() => [BoxType]) boxes: BoxType[];
}
