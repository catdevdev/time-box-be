import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Box, BoxDocument } from './schemas/box.schema';
import { BoxInput } from './inputs/box.input';
import {
  Warehouse,
  WarehouseDocument,
} from 'src/warehouses/schemas/warehouse.schema';

@Injectable()
export class BoxesService {
  constructor(@InjectModel(Box.name) private boxModel: Model<BoxDocument>) {}

  async create(boxInput: BoxInput): Promise<Box> {
    const createdBox = new this.boxModel(boxInput);
    return createdBox.save();
  }

  async findAllByUserId(userId: string): Promise<Box[]> {
    console.log(userId)
    return this.boxModel
      .find({ "user.id": userId })
      .populate('warehouse')
      .populate('user')
      .exec();
  }
  async findAll(): Promise<Box[]> {
    return this.boxModel.find().populate('warehouse').populate('user').exec();
  }
  async findByName(name: string): Promise<Box[]> {
    return this.boxModel.find({ name }).exec();
  }

  async addPlacementForBox(
    boxId: string,
    placement: number,
    warehouseId: string,
  ): Promise<Box> {
    return this.boxModel.findOneAndUpdate(
      { _id: boxId },
      { placement, warehouseId },
    );
  }
}