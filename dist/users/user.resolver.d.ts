import { WarehouseInput } from './inputs/warehouse.input';
import { WarehousesService } from './user.service';
export declare class WarehousesResolver {
    private warehousesService;
    constructor(warehousesService: WarehousesService);
    hello(): Promise<string>;
    warehouses(): Promise<import("./schemas/warehouse.schema").Warehouse[]>;
    warehouse(input: string): Promise<import("./schemas/warehouse.schema").Warehouse[]>;
    createdWarehouse(input: WarehouseInput): Promise<import("./schemas/warehouse.schema").Warehouse>;
}
