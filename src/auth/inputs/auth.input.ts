import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class AuthReq {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

// @InputType()
// export class AuthReq {
//   body: Body;
// }
