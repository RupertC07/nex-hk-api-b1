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
const lodash_1 = require("lodash");
class DutyUpdateAction {
    static execute(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedDuty = yield client_1.default.duty.update({
                where: {
                    deleted_at: null,
                    id: id,
                },
                data: {
                    name: data.name,
                    description: data.description,
                    required_hours: data.required_hours,
                    updated_at: new Date((0, lodash_1.now)()),
                },
            });
            return updatedDuty;
        });
    }
    static validate(data) {
        const schema = zod_1.z.object({
            name: zod_1.z.string().max(255),
            description: zod_1.z.string().max(500),
            required_hours: zod_1.z.number(),
        });
        return schema.safeParse(data);
    }
    static validDuty(name, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const duty = yield client_1.default.duty.findFirst({
                where: {
                    deleted_at: null,
                    name: name,
                    id: {
                        not: id,
                    },
                },
            });
            return duty ? false : true;
        });
    }
}
exports.default = DutyUpdateAction;
//# sourceMappingURL=dutyUpdateAction.js.map