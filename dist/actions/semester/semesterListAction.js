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
class SemesterListAction {
    static execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ search = null, page = 1, perPage = 5, }) {
            const where = {
                deleted_at: null,
                OR: search
                    ? [
                        { sy: { contains: search, mode: "insensitive" } },
                        { term: { equals: search } },
                    ]
                    : undefined,
            };
            // console.log(
            //   `Executing with search: ${search}, page: ${page}, perPage: ${perPage}`
            // );
            const totalSemester = yield client_1.default.semester.count({ where });
            const semester = yield client_1.default.semester.findMany({
                where,
                skip: (page - 1) * perPage,
                take: perPage,
            });
            const totalPages = Math.ceil(totalSemester / perPage);
            return {
                semester,
                totalSemester: semester.length,
                totalPages,
                currentPage: page,
                nextPage: page < totalPages ? page + 1 : null,
                prevPage: page > 1 ? page - 1 : null,
            };
        });
    }
}
exports.default = SemesterListAction;
//# sourceMappingURL=semesterListAction.js.map