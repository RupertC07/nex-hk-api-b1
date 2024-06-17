import { Request, Response, NextFunction } from "express";
import AppResponse from "../utils/AppResponse";
import Token from "../utils/token";
import { Admin } from "@prisma/client";
import AdminShowAction from "../actions/admin/adminShowAction";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      adminData: Admin;
    }
  }
}

class AdminMiddleware {
  static async authToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return AppResponse.sendError({
        res: res,
        data: null,
        message: "Unauthorized",
        code: 403,
      });
    }
    try {
      const decodedToken = Token.validate(token);
      const userId = (decodedToken as Admin).id;
      const user = await AdminShowAction.execute(userId);
      if (!user || user == null || user.role != "admin") {
        return AppResponse.sendError({
          res: res,
          data: null,
          message: "Unauthorized",
          code: 403,
        });
      }

      req.adminData = user;

      next();
    } catch (error: any) {
      if (error instanceof TokenExpiredError) {
        return AppResponse.sendError({
          res: res,
          data: null,
          message: "Token expired",
          code: 401, // Unauthorized
        });
      }

      if (error instanceof JsonWebTokenError) {
        return AppResponse.sendError({
          res: res,
          data: null,
          message: "Token invalid",
          code: 401, // Unauthorized
        });
      }

      console.log(error);
      AppResponse.sendError({
        res: res,
        data: null,
        message: "internal server error",
        code: 500,
      });
      console.log(error.message.TokenExpiredError);
    }
  }
}

export default AdminMiddleware;
