import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './dto/user.dto';
import { UserInput } from './inputs/user.input';
import { UsersService } from './users.service';

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
