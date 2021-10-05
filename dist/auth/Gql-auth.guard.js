"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GqlAuthGuard = void 0;
const graphql_1 = require("@nestjs/graphql");
const passport_1 = require("@nestjs/passport");
class GqlAuthGuard extends (0, passport_1.AuthGuard)('local') {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}
exports.GqlAuthGuard = GqlAuthGuard;
//# sourceMappingURL=Gql-auth.guard.js.map