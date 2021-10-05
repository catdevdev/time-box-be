import { WarehouseGroupInput } from './inputs/warehouses-group.input';
import { WarehousesGroupService } from './warehouses-group.service';
export declare class WarehouseGroupResolver {
    private warehousesGroupService;
    constructor(warehousesGroupService: WarehousesGroupService);
    createWarehousesGroup(warehouseGroupInput: WarehouseGroupInput): Promise<import("./schemas/warehouses-group.schema").WarehouseGroup>;
}
