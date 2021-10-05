import { Model } from 'mongoose';
import { WarehousesService } from 'src/warehouses/warehouses.service';
import { WarehouseGroupInput } from './inputs/warehouses-group.input';
import { WarehouseDocument, WarehouseGroup } from './schemas/warehouses-group.schema';
export declare class WarehousesGroupService {
    private warehouseGroupModel;
    private warehouseService;
    constructor(warehouseGroupModel: Model<WarehouseDocument>, warehouseService: WarehousesService);
    createWarehouseGroup(warehouseGroupInput: WarehouseGroupInput): Promise<WarehouseGroup>;
    findAllWarehouseGroups(): Promise<WarehouseGroup[]>;
    findByIDWarehouseGroup(id: string): Promise<WarehouseGroup>;
}
