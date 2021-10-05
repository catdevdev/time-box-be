import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Warehouse, WarehouseDocument } from './schemas/warehouse.schema';
import { WarehouseInput } from './inputs/warehouse.input';

@Injectable()
export class WarehousesService {
  constructor(
    @InjectModel(Warehouse.name)
    private warehouseModel: Model<WarehouseDocument>,
  ) {}

  async create(createBoxDto: WarehouseInput): Promise<Warehouse> {
    const createdWarehouse = new this.warehouseModel(createBoxDto);
    return createdWarehouse.save();
  }
  async findAll(): Promise<Warehouse[]> {
    return this.warehouseModel.find().exec();
  }
  async findByName(name: string): Promise<Warehouse[]> {
    return this.warehouseModel.find({ name }).exec();
  }
}
