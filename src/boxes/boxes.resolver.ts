import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoxesService } from './boxes.service';
import { BoxType } from './dto/box.dto';
import { BoxInput } from './inputs/box.input';

@Resolver()
export class BoxesResolver {
  constructor(private catsService: BoxesService) {}

  @Query(() => [BoxType])
  async boxes() {
    return this.catsService.findAll();
  }

  @Query(() => [BoxType])
  async box(@Args('name') input: string) {
    return this.catsService.findByName(input);
  }

  @Mutation(() => BoxType)
  async createBox(@Args('input') input: BoxInput) {
    return this.catsService.create(input);
  }
}
