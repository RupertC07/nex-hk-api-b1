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
const constants_1 = require("../../config/constants");
class SemesterCreateAction {
    static execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const semester = yield client_1.default.semester.create({
                data,
            });
            return semester;
        });
    }
    static validate(data) {
        const schema = zod_1.z.object({
            sy: zod_1.z.string(),
            term: zod_1.z.nativeEnum(constants_1.SemTerm),
            status: zod_1.z.nativeEnum(constants_1.SemStatus)
        });
        return schema.safeParse(data);
    }
    static validSem(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sem = yield client_1.default.semester.findFirst({
                where: {
                    deleted_at: null,
                    sy: data.sy,
                    term: data.term,
                },
            });
            return sem ? false : true;
        });
    }
}
exports.default = SemesterCreateAction;
//# sourceMappingURL=semesterCreateAction.js.map