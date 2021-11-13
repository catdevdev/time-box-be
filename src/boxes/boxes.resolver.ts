import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/users/schemas/user.schema';
import { BoxesService } from './boxes.service';
import { BoxType } from './dto/box.dto';
import {
  AddNoteIntoBoxInput,
  AddPlacementForBoxInput,
  BoxInput,
} from './inputs/box.input';

@Resolver()
export class BoxesResolver {
  constructor(private boxesService: BoxesService) {}

  @Query(() => [BoxType])
  async boxes() {
    return this.boxesService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => BoxType)
  async createBox(
    @Args('input') input: BoxInput,
    @CurrentUser() currentUser: User,
  ) {
    return this.boxesService.create(
      input.name,
      input.description,
      currentUser._id,
    );
  }

  @Mutation(() => BoxType)
  async addPlacementForBox(@Args('input') input: AddPlacementForBoxInput) {
    return this.boxesService.addPlacementForBox(
      input.boxId,
      input.placement,
      input.warehouseId,
    );
  }

  @Mutation(() => BoxType)
  async addNoteIntoBox(@Args('input') input: AddNoteIntoBoxInput) {
    return this.boxesService.addNoteIntoBox(input.boxId, input.note);
  }

  @Mutation(() => BoxType)
  async openBox(@Args('boxId') boxId: string) {
    return this.boxesService.openBox(boxId);
  }
}
