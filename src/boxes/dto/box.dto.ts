import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { UserType } from 'src/users/dto/user.dto';
import { WarehouseType } from 'src/warehouses/dto/warehouse.dto';

@ObjectType()
export class BoxType {
  @Field(() => ID) id: string;
  @Field() name: string;
  @Field() description: string;
  @Field(() => [String]) imageIds: string[];
  @Field(() => [String]) notes: string[];
  @Field({ nullable: true }) dateWhenCanBeOpened: Date;
  @Field({ nullable: true }) isCanBeOpened: boolean;
  @Field({ nullable: true }) isOpened: boolean;
  @Field({ nullable: true }) placement: number;
  @Field(() => WarehouseType, { nullable: true }) warehouse: WarehouseType;
  @Field(() => UserType) user: UserType;
}
