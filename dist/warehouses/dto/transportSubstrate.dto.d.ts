export declare class PositionType {
    x: number;
    y: number;
    z: number;
}
export declare class BoxPositionType {
    boxId: string;
    position: PositionType;
}
export declare class TransportSubstrateType {
    position: PositionType;
    warehouseId: string;
    boxOnSubstrate: boolean;
    speed: number;
}
export declare class BoxToTransportType {
    warehouseId: string;
    position: PositionType;
    boxId: string;
}
export declare class GroupBoxesToTransportType {
    actionName: string;
    box: BoxToTransportType;
}
