import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { CatType } from './dto/create-cat.dto';
import { CatInput } from './inputs/cat.input';

@Resolver()
export class CatsResolver {
  constructor(private catsService: CatsService) {}

  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }
  @Query(() => [CatType])
  async cats() {
    return this.catsService.findAll();
  }

  @Query(() => [CatType])
  async cat(@Args('name') input: string) {
    return this.catsService.findByName(input);
  }

  @Mutation(() => CatType)
  async createCat(@Args('input') input: CatInput) {
    return this.catsService.create(input);
  }
}
