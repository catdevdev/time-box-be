export declare class MoveTransportInput {
    warehouseId: string;
}
export declare class BoxStatusInput {
    warehouseId: string;
}
export declare class PutBoxIntoWarehouseInput {
    warehouseGroupId: string;
    boxId: string;
    seconds: number;
}
export declare class UnloadBoxFromWarehouseInput {
    warehouseId: string;
    boxId: string;
}
