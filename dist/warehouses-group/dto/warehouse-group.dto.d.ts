import { Warehouse } from 'src/warehouses/schemas/warehouse.schema';
declare class Location {
    latitude: number;
    longitude: number;
}
export declare class WarehouseGroupType {
    id: string;
    name: string;
    location: Location;
    warehouses: Warehouse[];
}
export {};
