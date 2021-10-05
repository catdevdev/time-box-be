import { User } from 'src/users/schemas/user.schema';
import { BoxesService } from './boxes.service';
import { AddNoteIntoBoxInput, AddPlacementForBoxInput, BoxInput } from './inputs/box.input';
export declare class BoxesResolver {
    private boxesService;
    constructor(boxesService: BoxesService);
    boxes(): Promise<import("./schemas/box.schema").Box[]>;
    boxById(boxId: string): Promise<import("./schemas/box.schema").Box>;
    createBox(input: BoxInput, currentUser: User): Promise<import("./schemas/box.schema").Box>;
    addPlacementForBox(input: AddPlacementForBoxInput): Promise<import("./schemas/box.schema").Box>;
    addNoteIntoBox(input: AddNoteIntoBoxInput): Promise<import("./schemas/box.schema").Box>;
    openBox(boxId: string): Promise<import("./schemas/box.schema").Box>;
}
