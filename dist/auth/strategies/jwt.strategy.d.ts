import { UsersService } from 'src/users/users.service';
import { Strategy } from 'passport-jwt';
import { User } from 'src/users/schemas/user.schema';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersService;
    constructor(usersService: UsersService);
    validate(validationPayload: {
        username: string;
        sub: string;
    }): Promise<User | null>;
}
export {};
