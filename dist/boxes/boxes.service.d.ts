import { Model, ObjectId } from 'mongoose';
import { Box, BoxDocument } from './schemas/box.schema';
export declare class BoxesService {
    private boxModel;
    constructor(boxModel: Model<BoxDocument>);
    create(boxName: string, boxDescription: string, userId: ObjectId): Promise<Box>;
    findAll(): Promise<Box[]>;
    findBoxById(id: string): Promise<Box>;
    addImageIntoBox(boxId: string, imageId: string): Promise<Box>;
    addNoteIntoBox(boxId: string, noteTxt: string): Promise<Box>;
    addPlacementForBox(boxId: string, placement: number, warehouseId: string): Promise<Box>;
    closeBoxForTime(boxId: string, timeInSeconds: number): Promise<Box>;
    unloadBox(boxId: string): Promise<Box>;
    openBox(boxId: string): Promise<Box>;
}
