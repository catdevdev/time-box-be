import { Field, InputType } from '@nestjs/graphql';
import { Coordinates } from '../dto/warehouse.dto';

@InputType()
export class WarehouseInput {
  @Field()
  name: string;
  @Field()
  coordinates: Coordinates;
}
