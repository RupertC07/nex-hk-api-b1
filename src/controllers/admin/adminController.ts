import session from "express-session";
import { CustomSession } from "../../types/session";
import Mailer from "../../utils/Mailer";
import { ErrorRequestHandler, Request, Response, response } from "express";
import AppResponse from "../../utils/AppResponse";
import AuthAction from "../../actions/admin/authAction";
import { User } from "../../types/custom";
import { omit, result } from "lodash";
import generateOtp from "../../utils/otpGenerator";
import otpSession from "../../utils/session";
import AdminShowAction from "../../actions/admin/adminShowAction";
import AdminUpdateAction from "../../actions/admin/adminUpdateAction";

const mailer = new Mailer();

class AdminController {
  async auth(req: Request, res: Response) {
    try {
      const data: User = {
        email: req.body.email,
        password: req.body.password,
      };

      const validation = AuthAction.validate(data);

      if (!validation.success) {
        return AppResponse.sendError({
          res: res,
          data: null,
          message: `Error : ${validation.error.errors}`,
          code: 400,
        });
      }

      const admin = await AuthAction.execute(data);

      const code = generateOtp(6);
      const verification_id = await otpSession.generate(
        omit(data, ["password"]),
        code,
        req
      );

      await mailer.sendVerificationCode(code, String(data.email));
      return AppResponse.sendSuccess({
        res: res,
        data: { verification_id }, // Return only the session ID
        message: "Verification code sent.",
        code: 200,
      });
    } catch (error: any) {
      if (error.message == "Invalid Login Credentials") {
        return AppResponse.sendError({
          res: res,
          data: null,
          message: error.message,
          code: 401,
        });
      }
      return AppResponse.sendError({
        res: res,
        data: null,
        message: `Internal server error : ${error.message}`,
        code: 500,
      });
    }
  }

  async verifyAuth(req: Request, res: Response) {
    try {
      if (!req.body.otp) {
        return AppResponse.sendError({
          res: res,
          data: null,
          message: "Verificatin code is required",
          code: 400,
        });
      }

      const verification_id = req.params.verification_id;

      // Cast req.session to CustomSession

      const userData = await otpSession.getSessionInfo(req, verification_id);
      if (!userData) {
        return AppResponse.sendError({
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
        await otpSession.addAttempt(req, verification_id);

        if (userData.attempts >= maxAttempts) {
          await otpSession.revokeSession(req, verification_id);
          return AppResponse.sendError({
            res: res,
            data: null,
            message:
              "Incorrect verification code. Max attempt has been reached please try to register again",
            code: 429,
          });
        }

        return AppResponse.sendError({
          res: res,
          data: null,
          message: `Incorrect verification code. Remaining attempts ${3 - userData.attempts}`,
          code: 400,
        });
      }

      //   const newUser = await UserRegistrationAction.execute(userData.userData);
      const token = await AuthAction.generateToken(userData.userData);

      await otpSession.revokeSession(req, verification_id);

      return AppResponse.sendSuccess({
        res: res,
        data: { token: token },
        message: "User has been successfully logged in",
        code: 200,
      });
    } catch (error) {
      // console.log(error);

      return AppResponse.sendError({
        res: res,
        data: null,
        message: "Internal server error",
        code: 500,
      });
    }
  }

  async resetVerification(req: Request, res: Response) {
    try {
      const otpCode = generateOtp(6);
      const verification_id = req.params.verification_id;

      // Cast req.session to CustomSession

      // const userData = await otpSession.getSession(req, verification_id)

      const userData = await otpSession.getSessionInfo(req, verification_id);

      if (!userData) {
        return AppResponse.sendError({
          res: res,
          data: null,
          message: "Token not found",
          code: 404,
        });
      }

      const email = userData.userData.email;
      await otpSession.resetOtp(req, verification_id, otpCode);

      await mailer.sendVerificationCode(otpCode, email);

      return AppResponse.sendSuccess({
        res: res,
        data: null,
        message: "New otp has been successfully sent to email",
        code: 201,
      });
    } catch (error) {
      console.log(error);
      return AppResponse.sendError({
        res: res,
        data: null,
        message: "Internal server error",
        code: 500,
      });
    }
  }

  async get(req: Request, res: Response) {
    return AppResponse.sendSuccess({
      res: res,
      data: req.adminData,
      message: "Success",
      code: 200,
    });
  }

  async update(req: Request, res: Response) {
    try {
      const admin = req.adminData;
      const admin_is_found = await AdminShowAction.execute(admin.id);
      if (!admin_is_found) {
        return AppResponse.sendError({
          res: res,
          data: null,
          message: "Admin account not found",
          code: 404,
        });
      }

      const validation = AdminUpdateAction.validate(req.body);

      if (!validation.success) {
        return AppResponse.sendError({
          res: res,
          data: null,
          message: `Error : ${validation.error.errors[0].message}`,
          code: 400,
        });
      }

      const update = await AdminUpdateAction.execute(req.body, admin.id);

      return AppResponse.sendSuccess({
        res: res,
        data: update,
        message: "Admin has been successfully updated",
        code: 200,
      });
    } catch (error: any) {
      console.log(error);
      return AppResponse.sendError({
        res: res,
        data: null,
        message: "Internal Server Error",
        code: 500,
      });
    }
  }
}

export default AdminController;
