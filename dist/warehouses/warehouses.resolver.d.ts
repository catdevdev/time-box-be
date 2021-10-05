import { BoxStatusInput, MoveTransportInput, PutBoxIntoWarehouseInput, UnloadBoxFromWarehouseInput } from './inputs/warehouse.input';
import { WarehousesService } from './warehouses.service';
export declare class WarehousesResolver {
    private warehousesService;
    constructor(warehousesService: WarehousesService);
    warehouses(): Promise<import("./schemas/warehouse.schema").Warehouse[]>;
    warehouse(input: string): Promise<import("./schemas/warehouse.schema").Warehouse>;
    boxesPosition(warehouseId: string): Promise<({
        boxId: import("mongoose").Schema.Types.ObjectId;
        position: {
            x: number;
            y: number;
            z: number;
        };
    } | {
        boxId: string;
        position: import("../types").Vector3;
    })[]>;
    freeWarehouseByWarehouseGroupId(warehouseGroupId: string): Promise<import("./schemas/warehouse.schema").Warehouse>;
    transportSubstratePositions(): Promise<{
        warehouseId: string;
        position: import("../types").Vector3;
        boxOnSubstrate: boolean;
    }[]>;
    transportSubstratePosition(warehouseId: string): Promise<{
        warehouseId: string;
        position: import("../types").Vector3;
        boxOnSubstrate: boolean;
    }>;
    createWarehouse(warehouseId: string): Promise<import("./schemas/warehouse.schema").Warehouse>;
    moveTransport(input: MoveTransportInput): AsyncIterator<unknown, any, undefined>;
    boxesToTransportPosition(input: BoxStatusInput): AsyncIterator<unknown, any, undefined>;
    boxToTransport(warehouseId: string): {
        warehouseId: string;
        boxes: {
            boxId: string;
            position: import("../types").Vector3;
        }[];
    };
    putBoxIntoWarehouse(putBoxIntoWarehouseInput: PutBoxIntoWarehouseInput): Promise<import("./schemas/warehouse.schema").Warehouse>;
    unloadBoxFromWarehouse(unloadBoxFromWarehouseInput: UnloadBoxFromWarehouseInput): Promise<import("./schemas/warehouse.schema").Warehouse>;
}
