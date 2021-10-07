import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WarehouseType } from './dto/user.dto';
import { WarehouseInput } from './inputs/user.input';
import { WarehousesService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserType])
  async users() {
    return this.usersService.findAll();
  }

  @Mutation(() => UserType)
  async createUser(@Args('input') input: UserInput) {
    console.log(input);
    return this.usersService.create(input);
  }
}
