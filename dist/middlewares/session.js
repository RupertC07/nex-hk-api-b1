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
exports.sessionCheck = exports.sessionResetValidation = exports.checkSessionOtp = void 0;
const AppResponse_1 = __importDefault(require("../utils/AppResponse"));
const session_1 = __importDefault(require("../utils/session"));
const checkSessionOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionId = req.params.verification_id;
        // Cast req.session to CustomSession
        const userData = yield session_1.default.getSessionInfo(req, sessionId);
        const maxAttempts = 3;
        if (userData) {
            const otpExp = userData.otpExpiration;
            const now = Date.now();
            if (now >= otpExp) {
                return AppResponse_1.default.sendError({
                    res: res,
                    data: null,
                    message: "Verification code is expired. Please request for new one",
                    code: 403,
                });
            }
            next();
        }
        else {
            return AppResponse_1.default.sendError({
                res: res,
                data: null,
                message: "Session not found",
                code: 404,
            });
        }
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
exports.checkSessionOtp = checkSessionOtp;
const sessionResetValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionId = req.params.sessionId;
        // Cast req.session to CustomSession
        const userData = yield session_1.default.getSessionInfo(req, sessionId);
        const maxAttempts = 3;
        if (userData) {
            const otpExp = userData.otpExpiration;
            const now = Date.now();
            const resendTime = otpExp - 2 * 60 * 1000;
            if (now >= resendTime) {
                next();
            }
            else {
                return AppResponse_1.default.sendError({
                    res: res,
                    data: null,
                    message: "Request cannot process. Active verification code  found",
                    code: 403,
                });
            }
        }
        else {
            return AppResponse_1.default.sendError({
                res: res,
                data: null,
                message: "Session not found",
                code: 404,
            });
        }
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
exports.sessionResetValidation = sessionResetValidation;
const sessionCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hasSession = yield session_1.default.checkUserSession(req);
        if (hasSession) {
            return AppResponse_1.default.sendError({
                res: res,
                message: "User has already generate verification code. Please verify the account first",
                data: null,
                code: 403,
            });
        }
        next();
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
exports.sessionCheck = sessionCheck;
//# sourceMappingURL=session.js.map