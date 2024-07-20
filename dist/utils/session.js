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
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class otpSession {
    static generate(data, otpCode, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionId = (0, uuid_1.v4)();
            const otpExpiration = Date.now() + 5 * 60 * 1000;
            const customSession = req.session;
            if (!customSession.userData) {
                customSession.userData = {};
            }
            // Store session data with session ID as the key
            customSession.userData[sessionId] = {
                otpCode: otpCode,
                userData: data,
                otpExpiration: otpExpiration,
                attempts: 0,
            };
            return sessionId;
        });
    }
    static getSessionInfo(req, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Cast req.session to CustomSession
            try {
                const customSession = req.session;
                // Check if req.session and req.session.userData are defined
                if (customSession &&
                    customSession.userData &&
                    customSession.userData[sessionId] &&
                    customSession.userData[sessionId].otpCode) {
                    const userData = customSession.userData[sessionId];
                    return userData;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    static addAttempt(req, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Cast req.session to CustomSession
            const customSession = req.session;
            // Check if req.session and req.session.userData are defined
            if (customSession &&
                customSession.userData &&
                customSession.userData[sessionId]) {
                const userData = customSession.userData[sessionId];
                userData.attempts = userData.attempts + 1;
                return userData;
            }
            else {
                return false;
            }
        });
    }
    //   static async getSessionId(req: Request, sessionId: any) {
    //     // Cast req.session to CustomSession
    //     const customSession = req.session as CustomSession;
    //     // Check if req.session and req.session.userData are defined
    //     if (
    //       customSession &&
    //       customSession.userData &&
    //       customSession.userData[sessionId]
    //     ) {
    //       const userData = customSession.userData[sessionId];
    //       return customSession.destroy;
    //     } else {
    //       return false;
    //     }
    //   }
    static revokeSession(req, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const customSession = req.session;
            if (customSession &&
                customSession.userData &&
                customSession.userData[sessionId]) {
                const userData = customSession.userData[sessionId];
                if (userData.otpCode !== undefined) {
                    userData.otpCode = null;
                }
                if (userData.userData !== undefined) {
                    userData.userData = null;
                }
                if (userData.attempts !== undefined) {
                    userData.attempts = null;
                }
                if (userData.otpExpiration !== undefined) {
                    userData.otpExpiration = null;
                }
                return true;
            }
            else {
                return false;
            }
        });
    }
    static resetOtp(req, sessionId, newOtp) {
        return __awaiter(this, void 0, void 0, function* () {
            // Cast req.session to CustomSession
            const customSession = req.session;
            const otpExpiration = Date.now() + 5 * 60 * 1000;
            // Check if req.session and req.session.userData are defined
            if (customSession &&
                customSession.userData &&
                customSession.userData[sessionId]) {
                const userData = customSession.userData[sessionId];
                userData.otpCode = newOtp;
                userData.attempts = 0;
                userData.otpExpiration = otpExpiration;
                return true;
            }
            else {
                return false;
            }
        });
    }
    static checkUserSession(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customSession = req.session;
                if (customSession && customSession.userData) {
                    return true;
                }
                return false;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = otpSession;
//# sourceMappingURL=session.js.map