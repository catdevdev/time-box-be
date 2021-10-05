import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Box } from 'src/boxes/schemas/box.schema';
import { WarehouseGroup } from 'src/warehouses-group/schemas/warehouses-group.schema';
export declare type WarehouseDocument = Warehouse & Document;
export declare class Warehouse {
    _id: ObjectId;
    warehouseGroup: WarehouseGroup;
    boxes: Box[];
}
export declare const WarehouseSchema: MongooseSchema<Document<Warehouse, any, any>, mongoose.Model<Document<Warehouse, any, any>, any, any, any>, {}>;
