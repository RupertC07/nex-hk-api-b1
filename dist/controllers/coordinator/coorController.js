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
const coorCreateAction_1 = __importDefault(require("../../actions/coordinator/coorCreateAction"));
const coorUpdateAction_1 = __importDefault(require("../../actions/coordinator/coorUpdateAction"));
const coorShowAction_1 = __importDefault(require("../../actions/coordinator/coorShowAction"));
const coorListAction_1 = __importDefault(require("../../actions/coordinator/coorListAction"));
const coorDeleteAction_1 = __importDefault(require("../../actions/coordinator/coorDeleteAction"));
const client_1 = __importDefault(require("../../utils/client"));
const AppResponse_1 = __importDefault(require("../../utils/AppResponse"));
const config_1 = __importDefault(require("../../config"));
class CoordinatorController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validation = coorCreateAction_1.default.validate(req.body);
                if (!validation.success) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: `Validation error: ${validation.error.errors.map((err) => err.message).join(", ")}`,
                        code: 400,
                    });
                }
                const { campus_id } = req.body;
                const campus = yield client_1.default.campus.findUnique({ where: { id: campus_id } });
                if (!campus) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: "Campus not found",
                        code: 404,
                    });
                }
                const coordinator = yield coorCreateAction_1.default.execute(req.body);
                return AppResponse_1.default.sendSuccess({
                    res: res,
                    data: coordinator,
                    message: "Coordinator created successfully",
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
                const validation = coorUpdateAction_1.default.validate(req.body);
                if (!validation.success) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: `Validation error: ${validation.error.errors.map((err) => err.message).join(", ")}`,
                        code: 400,
                    });
                }
                if (req.body.campus_id) {
                    const campus = yield client_1.default.campus.findUnique({ where: { id: req.body.campus_id } });
                    if (!campus) {
                        return AppResponse_1.default.sendError({
                            res: res,
                            data: null,
                            message: "Campus not found",
                            code: 404,
                        });
                    }
                }
                const coordinator = yield coorUpdateAction_1.default.execute(parseInt(id), req.body);
                return AppResponse_1.default.sendSuccess({
                    res: res,
                    data: coordinator,
                    message: "Coordinator updated successfully",
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
                const coordinator = yield coorShowAction_1.default.execute(parseInt(id));
                if (!coordinator) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: "Coordinator not found",
                        code: 404,
                    });
                }
                return AppResponse_1.default.sendSuccess({
                    res: res,
                    data: coordinator,
                    message: "Coordinator retrieved successfully",
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
                const { coordinators, total } = yield coorListAction_1.default.execute(page, pageSize);
                if (!coordinators) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: "No coordinators available",
                        code: 404,
                    });
                }
                const totalPages = Math.ceil(total / pageSize);
                return AppResponse_1.default.sendSuccess({
                    res: res,
                    data: {
                        coordinators,
                        pagination: {
                            total,
                            page,
                            pageSize,
                            totalPages
                        }
                    },
                    message: "Coordinators retrieved successfully",
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
                const coordinator = yield coorDeleteAction_1.default.execute(parseInt(id));
                if (!coordinator) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: "Coordinator not found or already deleted",
                        code: 404,
                    });
                }
                return AppResponse_1.default.sendSuccess({
                    res: res,
                    data: coordinator,
                    message: "Coordinator deleted successfully",
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
exports.default = CoordinatorController;
//# sourceMappingURL=coorController.js.map