import { Model, ObjectId } from 'mongoose';
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

  async create(
    boxName: string,
    boxDescription: string,
    userId: ObjectId,
  ): Promise<Box> {
    const createdBox = new this.boxModel({
      name: boxName,
      description: boxDescription,
      user: userId,
    });
    return createdBox.save();
  }

  async findAll(): Promise<Box[]> {
    return this.boxModel.find().populate('warehouse').populate('user').exec();
  }

  async findByName(name: string): Promise<Box[]> {
    return this.boxModel.find({ name }).exec();
  }

  async addImageIntoBox(boxId: string, imageId: string): Promise<Box> {
    const box = await this.boxModel.findByIdAndUpdate(boxId, {
      $push: { imageIds: imageId },
    });
    return box;
  }

  async addNoteIntoBox(boxId: string, noteTxt: string): Promise<Box> {
    const box = await this.boxModel.findByIdAndUpdate(boxId, {
      $push: { notes: noteTxt },
    });
    return box;
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
