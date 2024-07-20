"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const kysely_1 = require("kysely");
const config_1 = __importDefault(require("../config"));
const dialect = new kysely_1.PostgresDialect({
    pool: new pg_1.Pool({
        connectionString: config_1.default.db.connection_string,
    }),
});
const kyselyClientSingleton = () => {
    return new kysely_1.Kysely({
        dialect,
    });
};
const globalForKy = globalThis;
const kysely = (_a = globalForKy.kysely) !== null && _a !== void 0 ? _a : kyselyClientSingleton();
exports.default = kysely;
//# sourceMappingURL=kysely.js.map