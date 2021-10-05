import { Field, InputType } from '@nestjs/graphql';

@InputType()
class LocationInput {
  @Field() latitude: number;
  @Field() longitude: number;
}

@InputType()
export class WarehouseInput {
  @Field()
  name: string;
  @Field(() => LocationInput)
  location: LocationInput;
}
