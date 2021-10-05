"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const apollo_server_core_1 = require("apollo-server-core");
const boxes_module_1 = require("./boxes/boxes.module");
const warehouses_module_1 = require("./warehouses/warehouses.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const serve_static_1 = require("@nestjs/serve-static");
const warehouses_group_module_1 = require("./warehouses-group/warehouses-group.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                renderPath: 'uploads',
            }),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                playground: false,
                plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)()],
                installSubscriptionHandlers: true,
            }),
            mongoose_1.MongooseModule.forRoot('mongodb+srv://catdev:1234@cluster0.e6s6i.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
            boxes_module_1.BoxesModule,
            warehouses_module_1.WarehousesModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            warehouses_group_module_1.WarehouseGroupsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map