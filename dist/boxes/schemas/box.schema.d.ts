import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Warehouse } from 'src/warehouses/schemas/warehouse.schema';
import { User } from 'src/users/schemas/user.schema';
export declare type BoxDocument = Box & Document;
export declare class Box {
    _id: ObjectId;
    name: string;
    description: string;
    placement: number;
    imageIds: string[];
    notes: string[];
    dateWhenCanBeOpened: Date;
    isCanBeOpened: boolean;
    isOpened: boolean;
    warehouse: Warehouse;
    user: User;
}
export declare const BoxSchema: mongoose.Schema<Document<Box, any, any>, mongoose.Model<Document<Box, any, any>, any, any, any>, {}>;
