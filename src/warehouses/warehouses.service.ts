import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Warehouse, WarehouseDocument } from './schemas/warehouse.schema';
import { nanoid } from 'nanoid';

@Injectable()
export class WarehousesService {
  constructor(
    @InjectModel(Warehouse.name)
    private warehouseModel: Model<WarehouseDocument>,
  ) {}

  async createWarehouse(warehouseId: string): Promise<Warehouse> {
    const createdWarehouse = new this.warehouseModel({
      _id: new Types.ObjectId(),
      warehouse: warehouseId,
    });
    return createdWarehouse.save();
  }

  async findAllWarehouses(): Promise<Warehouse[]> {
    return this.warehouseModel.find().populate('boxes').exec();
  }

  async findByIDWarehouse(id: string): Promise<Warehouse> {
    return this.warehouseModel.findOne({ _id: id }).exec();
  }
}
