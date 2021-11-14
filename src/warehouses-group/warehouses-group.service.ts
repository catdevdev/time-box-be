import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { WarehousesService } from 'src/warehouses/warehouses.service';
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
    private warehouseService: WarehousesService,
  ) {}

  async createWarehouseGroup(
    warehouseGroupInput: WarehouseGroupInput,
  ): Promise<WarehouseGroup> {
    const createdWarehouseGroup = new this.warehouseGroupModel({
      ...warehouseGroupInput,
      _id: new Types.ObjectId(),
    });

    // this.warehouseService.transportSubstratePositions.push({
    //   warehouseId: createdWarehouseGroup._id,
    //   position: this.warehouseService.startedPosition,
    //   boxOnSubstrate: false,
    // });
    // this.warehouseService.warehouseQueues.push({
    //   isActive: false,
    //   warehouseId: createdWarehouseGroup._id,
    //   actions: [],
    // });
    // this.warehouseService.boxesToTransportPositions.push({
    //   warehouseId: createdWarehouseGroup._id,
    //   boxes: [],
    // });

    return createdWarehouseGroup.save();
  }

  async findAllWarehouseGroups(): Promise<WarehouseGroup[]> {
    const a = this.warehouseGroupModel
      .find()
      .populate({ path: 'warehouses', populate: { path: 'boxes' } })
      .exec();
    const b = await a;
    return a;
  }

  async findByIDWarehouseGroup(id: string): Promise<WarehouseGroup> {
    return this.warehouseGroupModel.findOne({ _id: id }).exec();
  }
}
