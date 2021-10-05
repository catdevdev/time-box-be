import { Model } from 'mongoose';
import { User, UsersDocument } from './schemas/user.schema';
import { UserInput } from './inputs/user.input';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UsersDocument>);
    create(userInput: UserInput): Promise<User>;
    findAll(): Promise<User[]>;
    findOneByName(username: string, boxId?: string): Promise<User>;
}
