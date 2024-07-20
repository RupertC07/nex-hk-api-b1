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
const config_1 = __importDefault(require("../../config"));
const AppResponse_1 = __importDefault(require("../../utils/AppResponse"));
const semesterCreateAction_1 = __importDefault(require("../../actions/semester/semesterCreateAction"));
const client_1 = __importDefault(require("../../utils/client"));
const deactivateSemesterAction_1 = __importDefault(require("../../actions/semester/deactivateSemesterAction"));
const updateSemesterAction_1 = __importDefault(require("../../actions/semester/updateSemesterAction"));
const showSemesterAction_1 = __importDefault(require("../../actions/semester/showSemesterAction"));
const semesterListAction_1 = __importDefault(require("../../actions/semester/semesterListAction"));
const showActiveSemAction_1 = __importDefault(require("../../actions/semester/showActiveSemAction"));
const activateSemesterAction_1 = __importDefault(require("../../actions/semester/activateSemesterAction"));
const deleteSemesterAction_1 = __importDefault(require("../../actions/semester/deleteSemesterAction"));
const constants_1 = require("../../config/constants");
class SemesterController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //   const admin = req.adminData;
                const validate = semesterCreateAction_1.default.validate(req.body);
                if (validate.error) {
                    return AppResponse_1.default.sendError({
                        res,
                        data: null,
                        message: validate.error.errors[0].message,
                        code: 400,
                    });
                }
                const isValid = yield semesterCreateAction_1.default.validSem(req.body);
                if (!isValid) {
                    return AppResponse_1.default.sendError({
                        res,
                        data: null,
                        message: "Semester already exists",
                        code: 400,
                    });
                }
                const result = yield client_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                    if (validate.data.status == constants_1.SemStatus.Active) {
                        yield deactivateSemesterAction_1.default.execute();
                    }
                    return yield semesterCreateAction_1.default.execute(req.body);
                }));
                return AppResponse_1.default.sendSuccess({
                    res,
                    data: result,
                    message: "Semeser has been successfully saved",
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
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //   const admin = req.adminData;
                const semId = req.params.id ? parseInt(req.params.id) : null;
                const validate = updateSemesterAction_1.default.validate(req.body);
                const sem = yield showSemesterAction_1.default.execute(semId);
                if (!sem) {
                    return AppResponse_1.default.sendError({
                        res,
                        data: null,
                        message: "Semester not found",
                        code: 404,
                    });
                }
                if (validate.error) {
                    return AppResponse_1.default.sendError({
                        res,
                        data: null,
                        message: validate.error.errors[0].message,
                        code: 400,
                    });
                }
                const isValid = yield updateSemesterAction_1.default.validSem(req.body, semId);
                if (!isValid) {
                    return AppResponse_1.default.sendError({
                        res,
                        data: null,
                        message: "Semester already exists",
                        code: 400,
                    });
                }
                const updatedData = yield updateSemesterAction_1.default.execute(sem.id, req.body);
                return AppResponse_1.default.sendSuccess({
                    res,
                    data: updatedData,
                    message: "Semeser has been successfully saved",
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
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //   const admin = req.adminData;
                const semId = req.params.id ? parseInt(req.params.id) : null;
                const semester = yield showSemesterAction_1.default.execute(semId);
                if (!semester) {
                    return AppResponse_1.default.sendError({
                        res,
                        data: null,
                        message: "Semester not found",
                        code: 404,
                    });
                }
                return AppResponse_1.default.sendSuccess({
                    res,
                    data: semester,
                    message: "Semeser has been successfully fetched",
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
                //   const admin = req.adminData;
                const search = req.query.search ? req.query.search.toString() : null; // Ensure search is either a string or undefined
                const perPage = req.query.perPage
                    ? parseInt(req.query.perPage)
                    : 5; // Parse perPage as number or undefined
                const page = req.query.page ? parseInt(req.query.page) : 1; // Parse page as number or undefined
                const sem = yield semesterListAction_1.default.execute({ search, page, perPage });
                return AppResponse_1.default.sendSuccess({
                    res: res,
                    data: sem,
                    message: "Semesters has been successfully fetched",
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
    showActive(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //   const admin = req.adminData;
                const activeSem = yield showActiveSemAction_1.default.execute();
                return AppResponse_1.default.sendSuccess({
                    res,
                    data: activeSem,
                    message: "Semester has been successfully fetched",
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
    activate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //   const admin = req.adminData;
                const semId = req.params.id ? parseInt(req.params.id) : null;
                const semester = yield showSemesterAction_1.default.execute(semId);
                if (!semester) {
                    return AppResponse_1.default.sendError({
                        res,
                        data: null,
                        message: "Semester not found",
                        code: 404,
                    });
                }
                const result = yield client_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                    yield deactivateSemesterAction_1.default.execute();
                    return yield activateSemesterAction_1.default.execute(semester.id);
                }));
                return AppResponse_1.default.sendSuccess({
                    res,
                    data: result,
                    message: "Semester has been successfully active",
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
    deactivate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //   const admin = req.adminData;
                const activeSem = yield deactivateSemesterAction_1.default.execute();
                return AppResponse_1.default.sendSuccess({
                    res,
                    data: null,
                    message: "Semester has been successfully deactivate",
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
                //   const admin = req.adminData;
                const semId = req.params.id ? parseInt(req.params.id) : null;
                const semester = yield showSemesterAction_1.default.execute(semId);
                if (!semester) {
                    return AppResponse_1.default.sendError({
                        res,
                        data: null,
                        message: "Semester not found",
                        code: 404,
                    });
                }
                yield deleteSemesterAction_1.default.execute(semester.id);
                return AppResponse_1.default.sendSuccess({
                    res,
                    data: null,
                    message: "Semeser has been successfully removed",
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
exports.default = SemesterController;
//# sourceMappingURL=semesterController.js.map