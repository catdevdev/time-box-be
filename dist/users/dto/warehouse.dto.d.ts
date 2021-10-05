import { BoxType } from 'src/boxes/dto/box.dto';
declare class Location {
    latitude: number;
    longitude: number;
}
export declare class WarehouseType {
    id: string;
    name: string;
    location: Location;
    boxes: BoxType[];
}
export {};
