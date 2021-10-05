import { WarehouseType } from 'src/warehouses/dto/warehouse.dto';
declare class LocationType {
    latitude: number;
    longitude: number;
}
export declare class WarehouseGroupType {
    id: string;
    name: string;
    location: LocationType;
    warehouses: WarehouseType[];
}
export {};
