"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseGroupModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const warehouses_group_schema_1 = require("./schemas/warehouses-group.schema");
const warehouse_group_resolver_1 = require("./warehouse-group.resolver");
let WarehouseGroupModule = class WarehouseGroupModule {
};
WarehouseGroupModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: warehouses_group_schema_1.WarehouseGroup.name, schema: warehouses_group_schema_1.WarehouseGroupSchema },
            ]),
        ],
        providers: [warehouse_group_resolver_1.WarehouseGroupResolver],
    })
], WarehouseGroupModule);
exports.WarehouseGroupModule = WarehouseGroupModule;
//# sourceMappingURL=warehouse-group.module.js.map