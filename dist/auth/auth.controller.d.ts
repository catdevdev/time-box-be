import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthReq } from './inputs/auth.input';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(body: AuthReq): Promise<{
        access_token: string;
    }>;
    register(body: AuthReq): Promise<{
        access_token: string;
    }>;
}
