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
const AppResponse_1 = __importDefault(require("../../utils/AppResponse"));
const config_1 = __importDefault(require("../../config"));
const dutyCreateAction_1 = __importDefault(require("../../actions/duty/dutyCreateAction"));
const dutyUpdateAction_1 = __importDefault(require("../../actions/duty/dutyUpdateAction"));
const dutyGetAction_1 = __importDefault(require("../../actions/duty/dutyGetAction"));
const dutyListAction_1 = __importDefault(require("../../actions/duty/dutyListAction"));
const dutyDeleteAction_1 = __importDefault(require("../../actions/duty/dutyDeleteAction"));
class DutyController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = req.adminData;
                const dutyId = req.params.id;
                const duty = yield dutyGetAction_1.default.execute(parseInt(dutyId));
                if (!duty) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: "Duty not found",
                        code: 404,
                    });
                }
                return AppResponse_1.default.sendSuccess({
                    res: res,
                    data: duty,
                    message: "Duty has been successfully fetched",
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
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = req.adminData;
                const validData = dutyCreateAction_1.default.validate(req.body);
                if (validData.error) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: validData.error.errors[0].message,
                        code: 400,
                    });
                }
                const isValid = yield dutyCreateAction_1.default.validDuty(validData.data.name);
                if (!isValid) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: "Duty type already exists",
                        code: 400,
                    });
                }
                const duty = yield dutyCreateAction_1.default.execute(req.body);
                return AppResponse_1.default.sendSuccess({
                    res: res,
                    data: duty,
                    message: "Duty has been successfully created",
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
                const admin = req.adminData;
                const dutyId = req.params.id;
                const duty_info = yield dutyGetAction_1.default.execute(parseInt(dutyId));
                if (!duty_info) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: "Duty not found",
                        code: 404,
                    });
                }
                const validData = dutyUpdateAction_1.default.validate(req.body);
                if (validData.error) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: validData.error.errors[0].message,
                        code: 400,
                    });
                }
                const isValid = yield dutyUpdateAction_1.default.validDuty(validData.data.name, duty_info.id);
                if (!isValid) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: "Duty type already exists",
                        code: 400,
                    });
                }
                const duty = yield dutyUpdateAction_1.default.execute(req.body, duty_info.id);
                return AppResponse_1.default.sendSuccess({
                    res: res,
                    data: duty,
                    message: "Duty has been successfully update",
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
                const admin = req.adminData;
                const dutyId = req.params.id;
                const duty = yield dutyGetAction_1.default.execute(parseInt(dutyId));
                if (!duty) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: "Duty not found",
                        code: 404,
                    });
                }
                const delete_duty = yield dutyDeleteAction_1.default.execute(duty.id);
                return AppResponse_1.default.sendSuccess({
                    res: res,
                    data: delete_duty,
                    message: "Duty has been successfully deleted",
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
            try {
                const admin = req.adminData;
                const search = req.query.search ? req.query.search.toString() : null; // Ensure search is either a string or undefined
                const perPage = req.query.perPage
                    ? parseInt(req.query.perPage)
                    : 5; // Parse perPage as number or undefined
                const page = req.query.page ? parseInt(req.query.page) : 1; // Parse page as number or undefined
                const duties = yield dutyListAction_1.default.execute({ search, page, perPage });
                return AppResponse_1.default.sendSuccess({
                    res: res,
                    data: duties,
                    message: "Duties has been successfully fetched",
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
exports.default = DutyController;
//# sourceMappingURL=dutyController.js.map