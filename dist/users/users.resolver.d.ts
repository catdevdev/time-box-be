import { UserInput } from './inputs/user.input';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
export declare class UsersResolver {
    private usersService;
    constructor(usersService: UsersService);
    users(): Promise<User[]>;
    me(boxId: string, currentUser: User): Promise<User>;
    createUser(input: UserInput): Promise<User>;
}
