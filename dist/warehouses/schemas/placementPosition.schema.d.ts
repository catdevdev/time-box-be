import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare type PlacementPositionDocument = PlacementPosition & Document;
export declare class PositionType {
    x: number;
    y: number;
    z: number;
}
export declare class PlacementPosition {
    position: string;
    : any;
}
export declare class BoxPositionType {
    position: PositionType;
}
export declare const PlacementPositionSchema: mongoose.Schema<Document<PlacementPosition, any, any>, mongoose.Model<Document<PlacementPosition, any, any>, any, any, any>, {}>;
