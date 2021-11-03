import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Box } from 'src/boxes/schemas/box.schema';
import { WarehouseGroup } from 'src/warehouses-group/schemas/warehouses-group.schema';
import { Transform } from 'class-transformer';

export type WarehouseDocument = Warehouse & Document;

@Schema()
export class Warehouse {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: WarehouseGroup.name })
  warehouseGroup: WarehouseGroup;
  boxes: Box[];
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);

WarehouseSchema.virtual('boxes', {
  ref: 'Box',
  localField: '_id',
  foreignField: 'warehouse',
});
