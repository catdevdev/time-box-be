import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from './schemas/user.schema';
import { UserInput } from './inputs/user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UsersDocument>,
  ) { }

  async create(userInput: UserInput): Promise<User> {
    const createdUser = new this.userModel(userInput);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('boxes').exec();
  }
  async findByName(name: string): Promise<User[]> {
    return this.userModel.find({ name }).exec();
  }
}
