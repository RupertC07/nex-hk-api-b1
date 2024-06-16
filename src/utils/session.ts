import { v4 as uuidv4 } from "uuid";
import session from "express-session";
import { Request } from "express";

interface CustomSession extends session.Session {
  userData?: {
    [sessionId: string]: {
      otpCode?: string;
      userData?: unknown;
      otpExpiration: unknown;
      attempts: any;

      // Add other properties if needed
    };
  };
}

type User = {
  email?: String;
  student_number?: String;
};

class otpSession {
  static async generate(data: User, otpCode: any, req: Request) {
    const sessionId = uuidv4();
    const otpExpiration = Date.now() + 5 * 60 * 1000;
    const customSession = req.session as CustomSession;
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
  }

  static async getSessionInfo(req: Request, sessionId: any) {
    // Cast req.session to CustomSession
    try {
      const customSession = req.session as CustomSession;
      // Check if req.session and req.session.userData are defined
      if (
        customSession &&
        customSession.userData &&
        customSession.userData[sessionId] &&
        customSession.userData[sessionId].otpCode
      ) {
        const userData = customSession.userData[sessionId];
        return userData;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  static async addAttempt(req: Request, sessionId: any) {
    // Cast req.session to CustomSession
    const customSession = req.session as CustomSession;
    // Check if req.session and req.session.userData are defined
    if (
      customSession &&
      customSession.userData &&
      customSession.userData[sessionId]
    ) {
      const userData = customSession.userData[sessionId];
      userData.attempts = userData.attempts + 1;
      return userData;
    } else {
      return false;
    }
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

  static async revokeSession(req: Request, sessionId: any): Promise<boolean> {
    const customSession = req.session as CustomSession;

    if (
      customSession &&
      customSession.userData &&
      customSession.userData[sessionId]
    ) {
      const userData = customSession.userData[sessionId];

      if (userData.otpCode !== undefined) {
        userData.otpCode = null as unknown as string | undefined;
      }
      if (userData.userData !== undefined) {
        userData.userData = null;
      }
      if (userData.attempts !== undefined) {
        userData.attempts = null as unknown as string | undefined;
      }
      if (userData.otpExpiration !== undefined) {
        userData.otpExpiration = null as unknown as string | undefined;
      }

      return true;
    } else {
      return false;
    }
  }

  static async resetOtp(req: Request, sessionId: any, newOtp: any) {
    // Cast req.session to CustomSession
    const customSession = req.session as CustomSession;

    const otpExpiration = Date.now() + 5 * 60 * 1000;
    // Check if req.session and req.session.userData are defined
    if (
      customSession &&
      customSession.userData &&
      customSession.userData[sessionId]
    ) {
      const userData = customSession.userData[sessionId];
      userData.otpCode = newOtp;
      userData.attempts = 0;
      userData.otpExpiration = otpExpiration;
      return true;
    } else {
      return false;
    }
  }

  static async checkUserSession(req: Request) {
    try {
      const customSession = req.session as CustomSession;

      if (customSession && customSession.userData) {
        return true;
      }

      return false;
    } catch (error) {
      throw error;
    }
  }
}

export default otpSession;
