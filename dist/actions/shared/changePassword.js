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
const bcrypt_1 = require("bcrypt");
const client_1 = __importDefault(require("../../utils/client"));
const zod_1 = require("zod");
class ChangePassword {
    static execute(account_id, new_password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = (0, bcrypt_1.hashSync)(new_password, 10);
            const updatePassword = client_1.default.account.update({
                where: {
                    id: account_id,
                },
                data: {
                    password: hashedPassword,
                },
            });
            return updatePassword;
        });
    }
    static validate(data) {
        const schema = zod_1.z
            .object({
            new_password: zod_1.z
                .string()
                .min(8, "New password must be at least 8 characters long"),
            confirm_password: zod_1.z.string(),
            old_password: zod_1.z.string(),
        })
            .refine((data) => data.new_password == data.confirm_password, {
            message: "New password and confirm password do not match",
            path: ["confirm_password"],
        })
            .refine((data) => data.new_password != data.old_password, {
            message: "New password cannot be the same as the old password",
            path: ["new_password"],
        });
        return schema.safeParse(data);
    }
}
exports.default = ChangePassword;
//# sourceMappingURL=changePassword.js.map