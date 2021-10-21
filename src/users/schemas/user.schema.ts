import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = User & Document;

@Schema()
export class User {
  // @Prop() _id: string;
  @Prop() username: string;
  @Prop() password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('boxes', {
  ref: 'Box',
  localField: '_id',
  foreignField: 'user',
});