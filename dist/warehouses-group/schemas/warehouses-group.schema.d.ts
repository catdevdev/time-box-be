import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
export declare type WarehouseDocument = WarehouseGroup & Document;
export declare class Location {
    longitude: number;
    latitude: number;
}
export declare class WarehouseGroup {
    _id: Types.ObjectId;
    name: string;
    location: Location;
}
export declare const WarehouseGroupSchema: mongoose.Schema<Document<WarehouseGroup, any, any>, mongoose.Model<Document<WarehouseGroup, any, any>, any, any, any>, {}>;
