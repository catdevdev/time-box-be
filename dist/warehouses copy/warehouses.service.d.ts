import { Model } from 'mongoose';
import { Warehouse, WarehouseDocument } from './schemas/warehouse.schema';
import { WarehouseInput } from './inputs/warehouse.input';
export declare class WarehousesService {
    private warehouseModel;
    constructor(warehouseModel: Model<WarehouseDocument>);
    create(warehouseInput: WarehouseInput): Promise<Warehouse>;
    findAll(): Promise<Warehouse[]>;
    findByName(name: string): Promise<Warehouse[]>;
}
