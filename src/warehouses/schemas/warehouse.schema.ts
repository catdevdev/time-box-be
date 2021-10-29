import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Box } from 'src/boxes/schemas/box.schema';

export type WarehouseDocument = WarehouseGroup & Document;

@Schema()
export class Location {
  @Prop() longitude: number;
  @Prop() latitude: number;
}

@Schema()
export class Warehouse {
  // @Prop() _id: string; 
}

@Schema()
export class WarehouseGroup {
  @Prop() name: string;
  @Prop({ type: Location }) location: Location;
  @Prop({ type: [Warehouse] }) warehouses: Warehouse[];
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);

  // WarehouseSchema.virtual('boxes', {
  //   ref: 'Box',
  //   localField: '_id',
  //   foreignField: 'warehouse',
  // });
