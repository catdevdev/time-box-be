import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Box } from 'src/boxes/schemas/box.schema';

export type WarehouseDocument = Warehouse & Document;

@Schema()
export class Location {
  @Prop() longitude: number;
  @Prop() latitude: number;
}

@Schema()
export class Warehouse {
  @Prop() name: string;
  @Prop({ type: Location }) location: Location;
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Box' })
  // boxes: Box[];
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);

WarehouseSchema.virtual("boxes", {
  ref: "Box",
  localField: '_id',
  foreignField: 'warehouse',
})
