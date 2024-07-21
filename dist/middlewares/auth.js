"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = void 0;
const AppResponse_1 = __importDefault(require("../utils/AppResponse"));
const token_1 = __importDefault(require("../utils/token"));
const client_1 = require("@prisma/client");
const adminShowAction_1 = __importDefault(require("../actions/admin/adminShowAction"));
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("../config"));
const authToken = (allowedRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return AppResponse_1.default.sendError({
                res: res,
                data: null,
                message: "Unauthorized",
                code: 403,
            });
        }
        try {
            const decodedToken = token_1.default.validate(token);
            if (!allowedRoles.includes(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.role)) {
                return AppResponse_1.default.sendError({
                    res: res,
                    data: null,
                    message: "Unauthorized",
                    code: 403,
                });
            }
            console.log(decodedToken);
            if (decodedToken.role == client_1.UserRole.admin) {
                const adminId = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.id;
                const user = yield adminShowAction_1.default.execute(adminId);
                if (!user || user == null) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: "Unauthorized",
                        code: 403,
                    });
                }
                req.adminData = user;
                next();
            }
            else {
                return AppResponse_1.default.sendError({
                    res: res,
                    data: null,
                    message: "Unauthorized",
                    code: 403,
                });
            }
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                return AppResponse_1.default.sendError({
                    res: res,
                    data: null,
                    message: "Token expired",
                    code: 401, // Unauthorized
                });
            }
            if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                return AppResponse_1.default.sendError({
                    res: res,
                    data: null,
                    message: "Token invalid",
                    code: 401, // Unauthorized
                });
            }
            return AppResponse_1.default.sendError({
                res: res,
                data: null,
                message: config_1.default.app.env == "development"
                    ? error.message
                    : "Internal Server Error",
                code: 500,
            });
        }
    });
};
exports.authToken = authToken;
//# sourceMappingURL=auth.js.map