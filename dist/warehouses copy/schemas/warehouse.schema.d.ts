import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare type WarehouseDocument = Warehouse & Document;
export declare class Location {
    longitude: number;
    latitude: number;
}
export declare class Warehouse {
    name: string;
    location: Location;
}
export declare const WarehouseSchema: mongoose.Schema<Document<Warehouse, any, any>, mongoose.Model<Document<Warehouse, any, any>, any, any, any>, {}>;
