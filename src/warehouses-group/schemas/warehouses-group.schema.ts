import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Box } from 'src/boxes/schemas/box.schema';
import { Warehouse } from 'src/warehouses/schemas/warehouse.schema';

export type WarehouseDocument = WarehouseGroup & Document;

@Schema()
export class Location {
  @Prop() longitude: number;
  @Prop() latitude: number;
}

@Schema()
export class WarehouseGroup {
  @Prop() name: string;
  @Prop({ type: Location }) location: Location;
}

export const WarehouseGroupSchema =
  SchemaFactory.createForClass(WarehouseGroup);

WarehouseGroupSchema.virtual('warehouses', {
  ref: 'Warehouse',
  localField: '_id',
  foreignField: 'warehouse',
});
