import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { Box } from 'src/boxes/schemas/box.schema';
import { Warehouse } from 'src/warehouses/schemas/warehouse.schema';
import { Transform } from 'class-transformer';

export type WarehouseDocument = WarehouseGroup & Document;

@Schema()
export class Location {
  @Prop() longitude: number;
  @Prop() latitude: number;
}

@Schema()
export class WarehouseGroup {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;
  @Prop() name: string;
  @Prop({ type: Location }) location: Location;
}

export const WarehouseGroupSchema =
  SchemaFactory.createForClass(WarehouseGroup);

WarehouseGroupSchema.virtual('warehouses', {
  ref: 'Warehouse',
  localField: '_id',
  foreignField: 'warehouseGroup',
});
