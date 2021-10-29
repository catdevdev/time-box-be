import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Warehouse,
  WarehouseDocument,
  WarehouseGroup,
} from './schemas/warehouse.schema';
import { WarehouseGroupInput } from './inputs/warehouse.input';

@Injectable()
export class WarehousesService {
  constructor(
    @InjectModel(Warehouse.name)
    private warehouseGroupModel: Model<WarehouseDocument>,
  ) {}

  async createWarehouseGroup(
    warehouseGroupInput: WarehouseGroupInput,
  ): Promise<WarehouseGroup> {
    const createdWarehouseGroup = new this.warehouseGroupModel(
      warehouseGroupInput,
    );
    console.log(warehouseGroupInput);
    console.log(createdWarehouseGroup);
    const a = createdWarehouseGroup.save();
    console.log(await a);
    return a;
  }

  async findAllWarehouseGroups(): Promise<WarehouseGroup[]> {
    return this.warehouseGroupModel.find().exec();
  }

  async findAllWarehouses(): Promise<WarehouseGroup[]> {
    return this.warehouseGroupModel.find().populate('boxes').exec();
  }

  async findByIDWarehouseGroup(id: string): Promise<WarehouseGroup[]> {
    return this.warehouseGroupModel.find({ _id: id }).exec();
  }
}
