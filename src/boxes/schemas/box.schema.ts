import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Warehouse } from 'src/warehouses/schemas/warehouse.schema';
import {  Type } from 'class-transformer';

export type BoxDocument = Box & Document;

@Schema()
export class Box {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Warehouse.name })
  @Type(() => Warehouse)
  warehouse: Warehouse;
}

export const BoxSchema = SchemaFactory.createForClass(Warehouse);
