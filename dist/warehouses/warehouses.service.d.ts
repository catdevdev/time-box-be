import { Model } from 'mongoose';
import { Warehouse, WarehouseDocument } from './schemas/warehouse.schema';
import { Vector3 } from 'src/types';
import { PubSub } from 'graphql-subscriptions';
import { BoxesService } from 'src/boxes/boxes.service';
declare type Action = {
    name: 'loadBox';
    boxId: string;
    seconds: number;
} | {
    name: 'unload';
    boxId: string;
};
export declare const pubSub: PubSub;
export declare class WarehousesService {
    private warehouseModel;
    private boxesService;
    a: any;
    boxId: any;
    constructor(warehouseModel: Model<WarehouseDocument>, boxesService: BoxesService);
    createWarehouse(warehouseGroupId: string): Promise<Warehouse>;
    findAllWarehouses(): Promise<Warehouse[]>;
    findByIDWarehouse(id: string): Promise<Warehouse>;
    putBoxIntoWarehouse: (warehouseId: string, boxId: string, seconds: number) => Promise<void>;
    unloadBoxFromWarehouse: (warehouseId: string, boxId: string, boxPlacementIndex: number) => Promise<void>;
    getBoxesPosition: (warehouseId: string) => Promise<{
        boxId: import("mongoose").Schema.Types.ObjectId;
        position: {
            x: number;
            y: number;
            z: number;
        };
    }[]>;
    getFreeWarehouseByWarehouseGroupId: (warehouseGroupId: string) => Promise<Warehouse>;
    startedPosition: Vector3;
    transportSubstratePositions: {
        warehouseId: string;
        position: Vector3;
        boxOnSubstrate: boolean;
    }[];
    boxesToTransportPositions: {
        warehouseId: string;
        boxes: {
            boxId: string;
            position: Vector3;
        }[];
    }[];
    warehouseQueues: {
        isActive: boolean;
        warehouseId: string;
        actions: Action[];
    }[];
    addToQueue: (warehouseId: string, action: Action) => void;
    private performQueue;
    initTransportSubstrateInWarehouses: () => Promise<void>;
    addTransportSubstrate: (warehouseId: string) => void;
    transportSubstratePosition: (warehouseId: string) => {
        warehouseId: string;
        position: Vector3;
        boxOnSubstrate: boolean;
    };
    private moveTransport;
    private loadBoxOnSubstrate;
    private unloadBoxFromSubstrate;
    private goToOusideBoxFromStartedPosition;
    private goToStartedPositionFromOusideBox;
    private goToPlacementPositionFromStartedPosition;
    private goToStartedPositionFromPlacementPosition;
    boxesToTransport: (warehouseId: string) => {
        warehouseId: string;
        boxes: {
            boxId: string;
            position: Vector3;
        }[];
    };
    private addBoxToTransport;
    private removeBoxToTransport;
}
export {};
