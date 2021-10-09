import { Controller, Post, Req, UseGuards, Request } from '@nestjs/common';
import { UserType } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByName(req.body.username);
    const token = await this.authService.login(user);
    return token;
  }
}
