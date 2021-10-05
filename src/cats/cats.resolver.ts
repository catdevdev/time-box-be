import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { CatType } from './dto/create-cat.dto';
// import { CreateCatDto } from './dto/create-cat.dto';
import { CatInput } from './inputs/cat.input';
import { Cat } from './schemas/cat.schema';

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
  @Mutation(() => CatType)
  async createCat(@Args('input') input: CatInput) {
    return this.catsService.create(input);
  }
}
