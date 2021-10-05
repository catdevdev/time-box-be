"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseGroupsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const warehouses_module_1 = require("../warehouses/warehouses.module");
const warehouses_service_1 = require("../warehouses/warehouses.service");
const warehouses_group_schema_1 = require("./schemas/warehouses-group.schema");
const warehouses_group_resolver_1 = require("./warehouses-group.resolver");
const warehouses_group_service_1 = require("./warehouses-group.service");
let WarehouseGroupsModule = class WarehouseGroupsModule {
};
WarehouseGroupsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: warehouses_group_schema_1.WarehouseGroup.name, schema: warehouses_group_schema_1.WarehouseGroupSchema },
            ]),
            warehouses_module_1.WarehousesModule,
        ],
        providers: [warehouses_group_resolver_1.WarehouseGroupResolver, warehouses_group_service_1.WarehousesGroupService],
    })
], WarehouseGroupsModule);
exports.WarehouseGroupsModule = WarehouseGroupsModule;
//# sourceMappingURL=warehouses-group.module.js.map