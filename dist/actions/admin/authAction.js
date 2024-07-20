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
const zod_1 = require("zod");
const client_1 = __importDefault(require("../../utils/client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../../utils/token"));
class AuthAction {
    static execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield client_1.default.admin.findFirst({
                where: {
                    email: String(data.email),
                },
                include: {
                    account: true,
                },
            });
            if (!admin) {
                throw new Error("Invalid Login Credentials");
            }
            const is_password_valid = bcrypt_1.default.compareSync(String(data.password), admin.account[0].password);
            if (!is_password_valid) {
                throw new Error("Invalid Login Credentials");
            }
            return true;
        });
    }
    static generateToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield client_1.default.admin.findFirst({
                where: {
                    email: data.email,
                },
                include: {
                    account: {
                        select: {
                            trusted_devices: true,
                        },
                    },
                },
            });
            if (!admin) {
                throw new Error("Invalid Login Credentials");
            }
            console.log(admin);
            return token_1.default.generate(admin);
        });
    }
    static validate(data) {
        const loginSchema = zod_1.z.object({
            email: zod_1.z.string().email(),
            password: zod_1.z.string(),
        });
        return loginSchema.safeParse(data);
    }
}
exports.default = AuthAction;
//# sourceMappingURL=authAction.js.map