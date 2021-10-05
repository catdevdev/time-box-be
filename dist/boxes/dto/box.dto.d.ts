import { UserType } from 'src/users/dto/user.dto';
import { WarehouseType } from 'src/warehouses/dto/warehouse.dto';
export declare class BoxType {
    id: string;
    name: string;
    description: string;
    imageIds: string[];
    notes: string[];
    dateWhenCanBeOpened: Date;
    isCanBeOpened: boolean;
    isOpened: boolean;
    placement: number;
    warehouse: WarehouseType;
    user: UserType;
}
