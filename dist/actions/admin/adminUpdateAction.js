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
const client_1 = __importDefault(require("../../utils/client"));
const zod_1 = require("zod");
class AdminUpdateAction {
    static execute(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.default.admin.update({
                where: {
                    id: id,
                },
                data,
            });
        });
    }
    static validate(data) {
        const adminSchema = zod_1.z.object({
            first_name: zod_1.z.string().max(255),
            last_name: zod_1.z.string(),
            email: zod_1.z.string().email(),
            birthdate: zod_1.z.string().optional().nullable(),
            contact_number: zod_1.z.string().optional().nullable(),
        });
        return adminSchema.safeParse(data);
    }
}
exports.default = AdminUpdateAction;
//# sourceMappingURL=adminUpdateAction.js.map