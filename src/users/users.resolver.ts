import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './dto/user.dto';
import { UserInput } from './inputs/user.input';
import { UsersService } from './users.service';

import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from './schemas/user.schema';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserType])
  async users() {
    return this.usersService.findAll();
  }

  @Query(() => UserType)
  @UseGuards(GqlAuthGuard)
  async getUser(@CurrentUser() currentUser: User) {
    return this.usersService.findOneByName(currentUser.username);
  }

  @Mutation(() => UserType)
  async createUser(@Args('input') input: UserInput) {
    return this.usersService.create(input);
  }
}
