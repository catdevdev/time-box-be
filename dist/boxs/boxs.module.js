"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxsModule = void 0;
const common_1 = require("@nestjs/common");
const boxs_service_1 = require("./boxs.service");
const boxs_resolver_1 = require("./boxs.resolver");
let BoxsModule = class BoxsModule {
};
BoxsModule = __decorate([
    (0, common_1.Module)({
        providers: [boxs_service_1.BoxsService, boxs_resolver_1.BoxsResolver]
    })
], BoxsModule);
exports.BoxsModule = BoxsModule;
//# sourceMappingURL=boxs.module.js.map