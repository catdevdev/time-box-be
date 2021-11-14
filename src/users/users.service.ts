import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from './schemas/user.schema';
import { UserInput } from './inputs/user.input';
import { UserType } from './dto/user.dto';
import { Warehouse } from 'src/warehouses/schemas/warehouse.schema';
import { WarehouseGroup } from 'src/warehouses-group/schemas/warehouses-group.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UsersDocument>,
  ) {}

  async create(userInput: UserInput): Promise<User> {
    const createdUser = new this.userModel({ ...userInput, role: 'user' });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('boxes').exec();
  }

  async findOneByName(username: string, boxId?: string): Promise<User> {
    const filterMatch = boxId && {
      match: {
        _id: {
          $eq: boxId,
        },
      },
    };

    return this.userModel
      .findOne({ username })
      .populate({
        path: 'boxes',
        ...filterMatch,
        populate: {
          path: 'warehouse',
          populate: {
            path: 'warehouseGroup',
          },
        },
      })
      .exec();
  }
}
