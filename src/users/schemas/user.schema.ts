import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';

export type UsersDocument = User & Document;

@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
  @Prop() role: string;
  @Prop() username: string;
  @Prop() password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('boxes', {
  ref: 'Box',
  localField: '_id',
  foreignField: 'user',
});
