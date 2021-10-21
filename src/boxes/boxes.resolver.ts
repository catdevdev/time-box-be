import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/users/schemas/user.schema';
import { BoxesService } from './boxes.service';
import { BoxType } from './dto/box.dto';
import { AddPlacementForBoxInput, BoxInput } from './inputs/box.input';

@Resolver()
export class BoxesResolver {
  constructor(private boxesService: BoxesService) {}

  // @UseGuards(GqlAuthGuard)
  // @Query(() => [BoxType])
  // async myBoxes(@CurrentUser() currentUser: User) {
  //   console.log(currentUser);
  //   return this.boxesService.findAllByUserId(currentUser._id);
  // }

  @Query(() => [BoxType])
  async boxes() {
    return this.boxesService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [BoxType])
  async box(@Args('name') input: string, @CurrentUser() currentUser: User) {
    return this.boxesService.findByName(input);
  }

  @Mutation(() => BoxType)
  async createBox(@Args('input') input: BoxInput) {
    return this.boxesService.create(input);
  }

  @Mutation(() => BoxType)
  async addPlacementForBox(@Args('input') input: AddPlacementForBoxInput) {
    return this.boxesService.addPlacementForBox(
      input.boxId,
      input.placement,
      input.warehouseId,
    );
  }
}
