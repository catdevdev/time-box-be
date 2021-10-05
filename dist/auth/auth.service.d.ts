import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: User): Promise<{
        access_token: string;
    }>;
    verify(token: string): Promise<User>;
}
