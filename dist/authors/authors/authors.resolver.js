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
exports.AuthorsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const author_model_1 = require("../models/author.model");
let AuthorsResolver = class AuthorsResolver {
    async author(id) {
        return '';
    }
    async posts(author) {
        const { id } = author;
        return this.postsService.findAll({ authorId: id });
    }
};
__decorate([
    (0, graphql_1.Query)((returns) => author_model_1.Author),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthorsResolver.prototype, "author", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [author_model_1.Author]),
    __metadata("design:returntype", Promise)
], AuthorsResolver.prototype, "posts", null);
AuthorsResolver = __decorate([
    (0, graphql_1.Resolver)((of) => author_model_1.Author)
], AuthorsResolver);
exports.AuthorsResolver = AuthorsResolver;
//# sourceMappingURL=authors.resolver.js.map