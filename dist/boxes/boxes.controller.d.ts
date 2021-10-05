/// <reference types="multer" />
import { BoxesService } from './boxes.service';
export declare class BoxesController {
    private boxes;
    constructor(boxes: BoxesService);
    uploadFile(file: Express.Multer.File, body: {
        boxId: string;
    }): void;
}
