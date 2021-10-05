import { Model } from 'mongoose';
import { Cat, CatDocument } from './schemas/cat.schema';
import { CatInput } from './inputs/cat.input';
export declare class CatsService {
    private catModel;
    constructor(catModel: Model<CatDocument>);
    create(createCatDto: CatInput): Promise<Cat>;
    findAll(): Promise<Cat[]>;
    findByName(name: string): Promise<Cat[]>;
}
