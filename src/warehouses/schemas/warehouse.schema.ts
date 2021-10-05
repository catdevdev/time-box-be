import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WarehouseDocument = Warehouse & Document;

type Coordinates = { longitude: number; latitude: number };

@Schema()
export class Warehouse {
  @Prop()
  name: string;
  @Prop({ type: { longitude: Number, latitude: Number } })
  coordinates: Coordinates;
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);
