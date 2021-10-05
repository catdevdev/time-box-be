import { Model } from 'mongoose';
import { WarehouseGroupInput } from './inputs/warehouse-group.input';
import { WarehouseDocument, WarehouseGroup } from './schemas/warehouse-group.schema';
export declare class WarehousesGroupService {
    private warehousesGroupModel;
    constructor(warehousesGroupModel: Model<WarehouseDocument>);
    createWarehouseGroup(warehouseGroupInput: WarehouseGroupInput): Promise<WarehouseGroup>;
    findAllWarehouseGroups(): Promise<WarehouseGroup[]>;
    findAllWarehouses(): Promise<WarehouseGroup[]>;
    findByIDWarehouseGroup(id: string): Promise<WarehouseGroup[]>;
}
