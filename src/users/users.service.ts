import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from './schemas/user.schema';
import { UserInput } from './inputs/user.input';
import { UserType } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UsersDocument>,
  ) {}

  async create(userInput: UserInput): Promise<User> {
    const createdUser = new this.userModel(userInput);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('boxes').exec();
  }

  async findOneByName(username: string): Promise<User> {
    return this.userModel.findOne({ username }).populate('boxes').exec();
  }
}