"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prismaClienSingleton = () => {
    return new client_1.PrismaClient();
};
const globalForPrisma = globalThis;
const prisma = globalForPrisma !== null && globalForPrisma !== void 0 ? globalForPrisma : prismaClienSingleton();
exports.default = prisma;
//# sourceMappingURL=client.js.map