import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { Warehouse } from 'src/warehouses/schemas/warehouse.schema';
import { User } from 'src/users/schemas/user.schema';
import { Transform } from 'class-transformer';

// import { Type } from 'class-transformer';

export type BoxDocument = Box & Document;

@Schema()
export class Box {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
  @Prop() name: string;
  @Prop() description: string;
  @Prop() placement: number;
  @Prop() imageIds: string[];
  @Prop() notes: string[];
  @Prop() dateWhenCanBeOpened: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Warehouse.name })
  warehouse: Warehouse;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;
}

export const BoxSchema = SchemaFactory.createForClass(Box);
