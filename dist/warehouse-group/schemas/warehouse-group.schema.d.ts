import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Warehouse } from 'src/warehouses/schemas/warehouse.schema';
export declare type WarehousesDocument = WarehouseGroup & Document;
export declare class Location {
    longitude: number;
    latitude: number;
}
export declare class WarehouseGroup {
    name: string;
    location: Location;
    warehouses: [Warehouse];
}
export declare const WarehousesGroupSchema: mongoose.Schema<Document<WarehouseGroup, any, any>, mongoose.Model<Document<WarehouseGroup, any, any>, any, any, any>, {}>;
