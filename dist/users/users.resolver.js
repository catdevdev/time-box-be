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
exports.UsersResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const user_dto_1 = require("./dto/user.dto");
const user_input_1 = require("./inputs/user.input");
const users_service_1 = require("./users.service");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
const current_user_decorator_1 = require("../auth/current-user.decorator");
const user_schema_1 = require("./schemas/user.schema");
let UsersResolver = class UsersResolver {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async users() {
        return this.usersService.findAll();
    }
    async me(boxId, currentUser) {
        return this.usersService.findOneByName(currentUser.username, boxId);
    }
    async createUser(input) {
        return this.usersService.create(input);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [user_dto_1.UserType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "users", null);
__decorate([
    (0, graphql_1.Query)(() => user_dto_1.UserType),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)('boxId', { nullable: true })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "me", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_dto_1.UserType),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.UserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "createUser", null);
UsersResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map