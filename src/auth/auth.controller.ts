import {
  Controller,
  Post,
  Req,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { UserType } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthReq } from './inputs/auth.input';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: AuthReq): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByName(body.username);
    const token = await this.authService.login(user);
    return token;
  }

  @Post('register')
  async register(@Body() body: AuthReq): Promise<{ access_token: string }> {
    console.log(body);
    await this.usersService.create(body);
    const foundUser = await this.usersService.findOneByName(body.username);
    const token = await this.authService.login(foundUser);
    return token;
  }
}
