import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WarehouseDocument = Warehouse & Document;

@Schema()
export class Coordinates {
  @Prop() longitude: number;
  @Prop() latitude: number;
}

@Schema()
export class Warehouse {
  @Prop() name: string;
  @Prop(() => Coordinates) coordinates: Coordinates;
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);
