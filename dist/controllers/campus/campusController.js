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
const campusCreateAction_1 = __importDefault(require("../../actions/campus/campusCreateAction"));
const campusUpdateAction_1 = __importDefault(require("../../actions/campus/campusUpdateAction"));
const campusShowAction_1 = __importDefault(require("../../actions/campus/campusShowAction"));
const campusListAction_1 = __importDefault(require("../../actions/campus/campusListAction"));
const campusDeleteAction_1 = __importDefault(require("../../actions/campus/campusDeleteAction"));
const AppResponse_1 = __importDefault(require("../../utils/AppResponse"));
const config_1 = __importDefault(require("../../config"));
class CampusController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validation = campusCreateAction_1.default.validate(req.body);
                if (!validation.success) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: `Validation error : ${validation.error.errors.map((err) => err.message).join(", ")}`,
                        code: 400,
                    });
                }
                const campus = yield campusCreateAction_1.default.execute(req.body);
                return AppResponse_1.default.sendSuccess({
                    res: res,
                    data: campus,
                    message: "Campus created successfully",
                    code: 201,
                });
            }
            catch (error) {
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
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const validation = campusUpdateAction_1.default.validate(req.body);
                if (!validation.success) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: `Validation error: ${validation.error.errors.map((err) => err.message).join(", ")}`,
                        code: 400,
                    });
                }
                const campus = yield campusUpdateAction_1.default.execute(parseInt(id), req.body);
                if (!campus) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: "Campus not found",
                        code: 400
                    });
                }
                return AppResponse_1.default.sendSuccess({
                    res: res,
                    data: campus,
                    message: "Campus updated successfully",
                    code: 200,
                });
            }
            catch (error) {
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
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const campus = yield campusShowAction_1.default.execute(parseInt(id));
                if (!campus) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: "Campus not found or has been deleted",
                        code: 404,
                    });
                }
                return AppResponse_1.default.sendSuccess({
                    res: res,
                    data: campus,
                    message: "Campus retrieved successfully",
                    code: 200,
                });
            }
            catch (error) {
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
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            try {
                const { campuses, total } = yield campusListAction_1.default.execute(page, pageSize);
                if (!campuses) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: "No campuses available",
                        code: 404,
                    });
                }
                const totalPages = Math.ceil(total / pageSize);
                return AppResponse_1.default.sendSuccess({
                    res: res,
                    data: {
                        campuses,
                        pagination: {
                            total,
                            page,
                            pageSize,
                            totalPages
                        }
                    },
                    message: "Campuses retrieved successfully",
                    code: 200,
                });
            }
            catch (error) {
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
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const campus = yield campusDeleteAction_1.default.execute(parseInt(id));
                if (!campus) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: "Campus not found or already deleted",
                        code: 404,
                    });
                }
                return AppResponse_1.default.sendSuccess({
                    res: res,
                    data: campus,
                    message: "Campus deleted successfully",
                    code: 200,
                });
            }
            catch (error) {
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
    }
}
exports.default = CampusController;
//# sourceMappingURL=campusController.js.map