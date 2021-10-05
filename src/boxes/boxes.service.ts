import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Box, BoxDocument } from './schemas/box.schema';
import { BoxInput } from './inputs/box.input';

@Injectable()
export class BoxesService {
  constructor(@InjectModel(Box.name) private boxModel: Model<BoxDocument>) {}

  async create(createBoxDto: BoxInput): Promise<Box> {
    const createdBox = new this.boxModel(createBoxDto);
    return createdBox.save();
  }
  async findAll(): Promise<Box[]> {
    return this.boxModel.find().exec();
  }
  async findByName(name: string): Promise<Box[]> {
    return this.boxModel.find({ name }).exec();
  }
}
