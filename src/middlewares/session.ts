import { NextFunction, Request, Response } from "express";
import AppResponse from "../utils/AppResponse";
import otpSession from "../utils/session";

export const checkSessionOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionId = req.params.verification_id;

    // Cast req.session to CustomSession

    const userData = await otpSession.getSessionInfo(req, sessionId);

    const maxAttempts = 3;

    if (userData) {
      const otpExp = userData.otpExpiration;
      const now = Date.now();

      if (now >= otpExp) {
        return AppResponse.sendError({
          res: res,
          data: null,
          message: "Verification code is expired. Please request for new one",
          code: 403,
        });
      }

      next();
    } else {
      return AppResponse.sendError({
        res: res,
        data: null,
        message: "Session not found",
        code: 404,
      });
    }
  } catch (error) {
    console.log(error);
    return AppResponse.sendError({
      res: res,
      data: null,
      message: "Internal server error",
      code: 500,
    });
  }
};

export const sessionResetValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionId = req.params.sessionId;

    // Cast req.session to CustomSession

    const userData = await otpSession.getSessionInfo(req, sessionId);

    const maxAttempts = 3;

    if (userData) {
      const otpExp = userData.otpExpiration;
      const now = Date.now();
      const resendTime = otpExp - 2 * 60 * 1000;

      if (now >= resendTime) {
        next();
      } else {
        return AppResponse.sendError({
          res: res,
          data: null,
          message: "Request cannot process. Active verification code  found",
          code: 403,
        });
      }
    } else {
      return AppResponse.sendError({
        res: res,
        data: null,
        message: "Session not found",
        code: 404,
      });
    }
  } catch (error) {
    console.log(error);
    return AppResponse.sendError({
      res: res,
      data: null,
      message: "Internal server error",
      code: 500,
    });
  }
};

export const sessionCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hasSession = await otpSession.checkUserSession(req);

    if (hasSession) {
      return AppResponse.sendError({
        res: res,
        message:
          "User has already generate verification code. Please verify the account first",
        data: null,
        code: 403,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return AppResponse.sendError({
      res: res,
      data: null,
      message: "Internal server error",
      code: 500,
    });
  }
};
