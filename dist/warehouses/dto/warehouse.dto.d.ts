import { BoxType } from 'src/boxes/dto/box.dto';
import { WarehouseGroupType } from 'src/warehouses-group/dto/warehouses-group.dto';
export declare class WarehouseType {
    id: string;
    boxes: BoxType[];
    warehouseGroup: WarehouseGroupType;
}
export declare class PositionType {
    x: number;
    y: number;
    z: number;
}
