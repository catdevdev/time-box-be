import { WarehouseGroupInput } from './inputs/warehouse-group.input';
import { WarehousesGroupService } from './warehouse-group.service';
export declare class WarehouseGroupResolver {
    private warehousesGroupService;
    constructor(warehousesGroupService: WarehousesGroupService);
    createWarehousesGroup(warehouseGroupInput: WarehouseGroupInput): Promise<import("./schemas/warehouse-group.schema").WarehouseGroup>;
}
