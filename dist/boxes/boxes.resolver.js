"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxesResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const current_user_decorator_1 = require("../auth/current-user.decorator");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
const user_schema_1 = require("../users/schemas/user.schema");
const boxes_service_1 = require("./boxes.service");
const box_dto_1 = require("./dto/box.dto");
const box_input_1 = require("./inputs/box.input");
let BoxesResolver = class BoxesResolver {
    constructor(boxesService) {
        this.boxesService = boxesService;
    }
    async boxes() {
        return this.boxesService.findAll();
    }
    async boxById(boxId) {
        return this.boxesService.findBoxById(boxId);
    }
    async createBox(input, currentUser) {
        return this.boxesService.create(input.name, input.description, currentUser._id);
    }
    async addPlacementForBox(input) {
        return this.boxesService.addPlacementForBox(input.boxId, input.placement, input.warehouseId);
    }
    async addNoteIntoBox(input) {
        return this.boxesService.addNoteIntoBox(input.boxId, input.note);
    }
    async openBox(boxId) {
        return this.boxesService.openBox(boxId);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [box_dto_1.BoxType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BoxesResolver.prototype, "boxes", null);
__decorate([
    (0, graphql_1.Query)(() => box_dto_1.BoxType),
    __param(0, (0, graphql_1.Args)('boxId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoxesResolver.prototype, "boxById", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => box_dto_1.BoxType),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [box_input_1.BoxInput,
        user_schema_1.User]),
    __metadata("design:returntype", Promise)
], BoxesResolver.prototype, "createBox", null);
__decorate([
    (0, graphql_1.Mutation)(() => box_dto_1.BoxType),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [box_input_1.AddPlacementForBoxInput]),
    __metadata("design:returntype", Promise)
], BoxesResolver.prototype, "addPlacementForBox", null);
__decorate([
    (0, graphql_1.Mutation)(() => box_dto_1.BoxType),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [box_input_1.AddNoteIntoBoxInput]),
    __metadata("design:returntype", Promise)
], BoxesResolver.prototype, "addNoteIntoBox", null);
__decorate([
    (0, graphql_1.Mutation)(() => box_dto_1.BoxType),
    __param(0, (0, graphql_1.Args)('boxId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoxesResolver.prototype, "openBox", null);
BoxesResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [boxes_service_1.BoxesService])
], BoxesResolver);
exports.BoxesResolver = BoxesResolver;
//# sourceMappingURL=boxes.resolver.js.map