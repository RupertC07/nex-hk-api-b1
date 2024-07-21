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
const Mailer_1 = __importDefault(require("../../utils/Mailer"));
const AppResponse_1 = __importDefault(require("../../utils/AppResponse"));
const authAction_1 = __importDefault(require("../../actions/admin/authAction"));
const lodash_1 = require("lodash");
const otpGenerator_1 = __importDefault(require("../../utils/otpGenerator"));
const session_1 = __importDefault(require("../../utils/session"));
const adminShowAction_1 = __importDefault(require("../../actions/admin/adminShowAction"));
const adminUpdateAction_1 = __importDefault(require("../../actions/admin/adminUpdateAction"));
const changePassword_1 = __importDefault(require("../../actions/shared/changePassword"));
const adminGetAction_1 = __importDefault(require("../../actions/admin/adminGetAction"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mailer = new Mailer_1.default();
let verification_id = null;
class AdminController {
    auth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    email: req.body.email,
                    password: req.body.password,
                };
                const validation = authAction_1.default.validate(data);
                if (!validation.success) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: `Error : ${validation.error.errors}`,
                        code: 400,
                    });
                }
                const admin = yield authAction_1.default.execute(data);
                const code = (0, otpGenerator_1.default)(6);
                verification_id = yield session_1.default.generate((0, lodash_1.omit)(data, ["password"]), code, req);
                yield mailer.sendVerificationCode(code, String(data.email));
                return AppResponse_1.default.sendSuccess({
                    res: res,
                    data: { verification_id }, // Return only the session ID
                    message: "Verification code sent.",
                    code: 200,
                });
            }
            catch (error) {
                if (error.message == "Invalid Login Credentials") {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: error.message,
                        code: 401,
                    });
                }
                yield session_1.default.revokeSession(req, verification_id);
                return AppResponse_1.default.sendError({
                    res: res,
                    data: null,
                    message: `Internal server error : ${error.message}`,
                    code: 500,
                });
            }
        });
    }
    verifyAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.otp) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: "Verificatin code is required",
                        code: 400,
                    });
                }
                const verification_id = req.params.verification_id;
                // Cast req.session to CustomSession
                const userData = yield session_1.default.getSessionInfo(req, verification_id);
                if (!userData) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: "Token not found",
                        code: 404,
                    });
                }
                const otpStored = userData.otpCode;
                const otpSent = req.body.otp;
                const maxAttempts = 3;
                if (!(otpSent == otpStored)) {
                    yield session_1.default.addAttempt(req, verification_id);
                    if (userData.attempts >= maxAttempts) {
                        yield session_1.default.revokeSession(req, verification_id);
                        return AppResponse_1.default.sendError({
                            res: res,
                            data: null,
                            message: "Incorrect verification code. Max attempt has been reached please try to register again",
                            code: 429,
                        });
                    }
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: `Incorrect verification code. Remaining attempts ${3 - userData.attempts}`,
                        code: 400,
                    });
                }
                //   const newUser = await UserRegistrationAction.execute(userData.userData);
                const token = yield authAction_1.default.generateToken(userData.userData);
                yield session_1.default.revokeSession(req, verification_id);
                return AppResponse_1.default.sendSuccess({
                    res: res,
                    data: { token: token },
                    message: "User has been successfully logged in",
                    code: 200,
                });
            }
            catch (error) {
                // console.log(error);
                return AppResponse_1.default.sendError({
                    res: res,
                    data: null,
                    message: "Internal server error",
                    code: 500,
                });
            }
        });
    }
    resetVerification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otpCode = (0, otpGenerator_1.default)(6);
                const verification_id = req.params.verification_id;
                // Cast req.session to CustomSession
                // const userData = await otpSession.getSession(req, verification_id)
                const userData = yield session_1.default.getSessionInfo(req, verification_id);
                if (!userData) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: "Token not found",
                        code: 404,
                    });
                }
                const email = userData.userData.email;
                yield session_1.default.resetOtp(req, verification_id, otpCode);
                yield mailer.sendVerificationCode(otpCode, email);
                return AppResponse_1.default.sendSuccess({
                    res: res,
                    data: null,
                    message: "New otp has been successfully sent to email",
                    code: 201,
                });
            }
            catch (error) {
                console.log(error);
                return AppResponse_1.default.sendError({
                    res: res,
                    data: null,
                    message: "Internal server error",
                    code: 500,
                });
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return AppResponse_1.default.sendSuccess({
                res: res,
                data: req.adminData,
                message: "Success",
                code: 200,
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = req.adminData;
                const admin_is_found = yield adminShowAction_1.default.execute(admin.id);
                if (!admin_is_found) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: "Admin account not found",
                        code: 404,
                    });
                }
                const validation = adminUpdateAction_1.default.validate(req.body);
                if (!validation.success) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: `Error : ${validation.error.errors[0].message}`,
                        code: 400,
                    });
                }
                const update = yield adminUpdateAction_1.default.execute(req.body, admin.id);
                return AppResponse_1.default.sendSuccess({
                    res: res,
                    data: update,
                    message: "Admin has been successfully updated",
                    code: 200,
                });
            }
            catch (error) {
                console.log(error);
                return AppResponse_1.default.sendError({
                    res: res,
                    data: null,
                    message: "Internal Server Error",
                    code: 500,
                });
            }
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = req.adminData;
                const validate = changePassword_1.default.validate(req.body);
                if (validate.error) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: validate.error.errors[0].message,
                        code: 400,
                    });
                }
                const adminInfo = yield adminGetAction_1.default.execute(admin.id);
                if (!adminInfo) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: "User not found",
                        code: 403,
                    });
                }
                const passwordIsValid = bcrypt_1.default.compareSync(validate.data.old_password, adminInfo.account[0].password);
                if (!passwordIsValid) {
                    return AppResponse_1.default.sendError({
                        res: res,
                        data: null,
                        message: "Current password is invalid",
                        code: 403,
                    });
                }
                const passwordUpdate = yield changePassword_1.default.execute(adminInfo.account[0].id, validate.data.new_password);
                return AppResponse_1.default.sendSuccess({
                    res: res,
                    data: null,
                    message: "Password has been successfully changed",
                    code: 200,
                });
            }
            catch (error) {
                return AppResponse_1.default.sendError({
                    res: res,
                    data: null,
                    message: `Internal server error : ${error.message}`,
                    code: 500,
                });
            }
        });
    }
}
exports.default = AdminController;
//# sourceMappingURL=adminController.js.map