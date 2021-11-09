import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/users/schemas/user.schema';
import { UserType } from 'src/users/dto/user.dto';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '123',
    });
  }
  async validate(validationPayload: {
    username: string;
    sub: string;
  }): Promise<User | null> {
    const user = await this.usersService.findOneByName(
      validationPayload.username,
    );
    return user;
  }
}
