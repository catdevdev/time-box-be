import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoxesService } from './boxes.service';
import { BoxType } from './dto/box.dto';
import { BoxInput } from './inputs/box.input';

@Resolver()
export class BoxesResolver {
  constructor(private catsService: BoxesService) {}

  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }
  @Query(() => [BoxType])
  async cats() {
    return this.catsService.findAll();
  }

  @Query(() => [BoxType])
  async cat(@Args('name') input: string) {
    return this.catsService.findByName(input);
  }

  @Mutation(() => BoxType)
  async createCat(@Args('input') input: BoxInput) {
    return this.catsService.create(input);
  }
}
