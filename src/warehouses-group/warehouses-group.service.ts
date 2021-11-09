import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { WarehouseGroupInput } from './inputs/warehouses-group.input';
import {
  WarehouseDocument,
  WarehouseGroup,
} from './schemas/warehouses-group.schema';

@Injectable()
export class WarehousesGroupService {
  constructor(
    @InjectModel(WarehouseGroup.name)
    private warehouseGroupModel: Model<WarehouseDocument>,
  ) {}

  async createWarehouseGroup(
    warehouseGroupInput: WarehouseGroupInput,
  ): Promise<WarehouseGroup> {
    const createdWarehouseGroup = new this.warehouseGroupModel({
      ...warehouseGroupInput,
      _id: new Types.ObjectId(),
    });

    return createdWarehouseGroup.save();
  }

  async findAllWarehouseGroups(): Promise<WarehouseGroup[]> {
    const a = this.warehouseGroupModel.find().populate('warehouses').exec();
    const b = await a;
    return a;
  }

  async findByIDWarehouseGroup(id: string): Promise<WarehouseGroup> {
    return this.warehouseGroupModel.findOne({ _id: id }).exec();
  }
}
