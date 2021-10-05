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
    goToOusideBoxFromStartedPosition: (warehouseId: string, positionIncomeBox: Vector3) => Promise<void>;
    goToStartedPositionFromOusideBox: (warehouseId: string) => Promise<void>;
    goToPlacementPositionFromStartedPosition: (warehouseId: string, placementIndex: number) => Promise<void>;
    goToStartedPositionFromPlacementPosition: (warehouseId: string) => Promise<void>;
}
export {};
