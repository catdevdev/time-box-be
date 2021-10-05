import { PubSub } from 'graphql-subscriptions';
import { WarehousesService } from './warehouses.service';
declare type Vector3 = {
    x: number;
    y: number;
    z: number;
};
export declare const pubSub: PubSub;
export declare class TransportSubstrateService {
    private warehousesService;
    constructor(warehousesService: WarehousesService);
    private processWarehouseGroups;
    private processWarehouseGroup;
    startedPosition: Vector3;
    transportSubstratePositions: {
        warehouseId: string;
        position: Vector3;
    }[];
    fillTransportSubstratePositions: () => Promise<void>;
    transportSubstratePosition: (warehouseId: string) => {
        warehouseId: string;
        position: Vector3;
    };
    private moveTransport;
    putBoxIntoWarehouse: (warehouseId: string, placementIndex: number, incomingBoxPosition: Vector3) => Promise<void>;
}
export {};
