import { Request, Response, NextFunction } from "express";
import AppResponse from "../utils/AppResponse";
import Token from "../utils/token";
import { Admin, Coordinator, UserRole } from "@prisma/client";
import AdminShowAction from "../actions/admin/adminShowAction";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import config from "../config"

declare global {
    namespace Express {
        interface Request {
            coordinatorData?: Coordinator;
            adminData?: Admin;
        }
    }
}

export const authToken = (allowedRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
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
            const decodedToken = Token.validate(token) as any;

            if (!allowedRoles.includes(decodedToken?.role)) {
                return AppResponse.sendError({
                    res: res,
                    data: null,
                    message: "Unauthorized",
                    code: 403,
                });
            }

            console.log(decodedToken);

            if (decodedToken.role == UserRole.admin) {

                const adminId = decodedToken?.id;
                const user = await AdminShowAction.execute(adminId);
                if (!user || user == null) {
                    return AppResponse.sendError({
                        res: res,
                        data: null,
                        message: "Unauthorized",
                        code: 403,
                    });
                }
                req.adminData = user
                next();
            } else {
                return AppResponse.sendError({
                    res: res,
                    data: null,
                    message: "Unauthorized",
                    code: 403,
                });
            }

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

            return AppResponse.sendError({
                res: res,
                data: null,
                message:
                    config.app.env == "development"
                        ? error.message
                        : "Internal Server Error",
                code: 500,
            });

        }

    }
}