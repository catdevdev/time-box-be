import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoxesService } from './boxes.service';
import { BoxType } from './dto/box.dto';
import { AddPlacementForBoxInput, BoxInput } from './inputs/box.input';

import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';


@Resolver()
export class BoxesResolver {
  constructor(private boxesService: BoxesService) { }

  @Query(() => [BoxType])
  async boxes() {
    return this.boxesService.findAll();
  }

  @Query(() => [BoxType])
  async box(@Args('name') input: string) {
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
  @Mutation(() => Boolean)
  async uploadFile(@Args({name: 'file', type: () => GraphQLUpload})
  {
      createReadStream,
      filename
  }: FileUpload): Promise<boolean> {
      return new Promise(async (resolve, reject) => 
          createReadStream()
              .pipe(createWriteStream(`./uploads/${filename}`))
              .on('finish', () => resolve(true))
              .on('error', () => reject(false))
      );
  }
}
