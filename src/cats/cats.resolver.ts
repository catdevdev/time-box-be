import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatInput } from './inputs/cat.input';

@Resolver()
export class CatsResolver {
  constructor(private catsService: CatsService) {}

  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }
  @Mutation(() => CreateCatDto)
  async createCat(@Args('input') input: CatInput) {
    return this.catsService.create(input);
  }
}
