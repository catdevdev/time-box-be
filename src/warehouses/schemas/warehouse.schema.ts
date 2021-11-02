import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Box } from 'src/boxes/schemas/box.schema';

export type WarehouseDocument = Warehouse & Document;

@Schema()
export class Warehouse {
  @Prop() _id: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Warehouse.name })
  warehouse: Warehouse;
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);

WarehouseSchema.virtual('boxes', {
  ref: 'Box',
  localField: '_id',
  foreignField: 'warehouse',
});
