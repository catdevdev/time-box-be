import { Field, InputType } from '@nestjs/graphql';

@InputType()
class LocationInput {
  @Field() latitude: number;
  @Field() longitude: number;
}

@InputType()
export class WarehouseGroupInput {
  @Field()
  name: string;
  @Field()
  location: LocationInput;
}

