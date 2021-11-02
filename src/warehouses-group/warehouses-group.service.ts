import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    const createdWarehouseGroup = new this.warehouseGroupModel(
      warehouseGroupInput,
    );

    return createdWarehouseGroup.save();
  }

  async findAllWarehouseGroups(): Promise<WarehouseGroup[]> {
    return this.warehouseGroupModel.find().populate('warehouses').exec();
  }

  async findByIDWarehouseGroup(id: string): Promise<WarehouseGroup[]> {
    return this.warehouseGroupModel.find({ _id: id }).exec();
  }
}


