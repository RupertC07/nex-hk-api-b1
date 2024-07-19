import { Request, Response } from "express";
import CoordinatorCreateAction from "../../actions/coordinator/coorCreateAction";
import CoordinatorUpdateAction from "../../actions/coordinator/coorUpdateAction";
import CoordinatorShowAction from "../../actions/coordinator/coorShowAction";
import CoordinatorListAction from "../../actions/coordinator/coorListAction";
import CoordinatorDeleteAction from "../../actions/coordinator/coorDeleteAction";
import prisma from "../../utils/client";
import AppResponse from "../../utils/AppResponse";

class CoordinatorController {
    async create(req: Request, res: Response) {
        try {
            const validation = CoordinatorCreateAction.validate(req.body);

            if (!validation.success) {
                return AppResponse.sendError({
                    res: res,
                    data: null,
                    message: `Validation error: ${validation.error.errors.map((err) => err.message).join(", ")}`,
                    code: 400,
                });
            }

            const { campus_id } = req.body;
            const campus = await prisma.campus.findUnique({ where: { id: campus_id } });

            if (!campus) {
                return AppResponse.sendError({
                    res: res,
                    data: null,
                    message: "Campus not found",
                    code: 404,
                });
            }

            const coordinator = await CoordinatorCreateAction.execute(req.body);

            return AppResponse.sendSuccess({
                res: res,
                data: coordinator,
                message: "Coordinator created successfully",
                code: 201,
            });
        } catch (error: any) {
            return AppResponse.sendError({
                res: res,
                data: null,
                message: `Internal server error: ${error.message}`,
                code: 500,
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const validation = CoordinatorUpdateAction.validate(req.body);

            if (!validation.success) {
                return AppResponse.sendError({
                    res: res,
                    data: null,
                    message: `Validation error: ${validation.error.errors.map((err) => err.message).join(", ")}`,
                    code: 400,
                });
            }

            if (req.body.campus_id) {
                const campus = await prisma.campus.findUnique({ where: { id: req.body.campus_id } });

                if (!campus) {
                    return AppResponse.sendError({
                        res: res,
                        data: null,
                        message: "Campus not found",
                        code: 404,
                    });
                }
            }

            const coordinator = await CoordinatorUpdateAction.execute(parseInt(id), req.body);

            return AppResponse.sendSuccess({
                res: res,
                data: coordinator,
                message: "Coordinator updated successfully",
                code: 200,
            });
        } catch (error: any) {
            return AppResponse.sendError({
                res: res,
                data: null,
                message: `Internal server error: ${error.message}`,
                code: 500,
            });
        }
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const coordinator = await CoordinatorShowAction.execute(parseInt(id));

            if (!coordinator) {
                return AppResponse.sendError({
                    res: res,
                    data: null,
                    message: "Coordinator not found",
                    code: 404,
                });
            }

            return AppResponse.sendSuccess({
                res: res,
                data: coordinator,
                message: "Coordinator retrieved successfully",
                code: 200,
            });
        } catch (error: any) {
            return AppResponse.sendError({
                res: res,
                data: null,
                message: `Internal server error: ${error.message}`,
                code: 500,
            });
        }
    }

    async list(req: Request, res: Response) {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        try {
            const { coordinators, total } = await CoordinatorListAction.execute(page, pageSize);

            if (!coordinators) {
                return AppResponse.sendError({
                    res: res,
                    data: null,
                    message: "No coordinators available",
                    code: 404,
                });
            }
            const totalPages = Math.ceil(total / pageSize);
            return AppResponse.sendSuccess({
                res: res,
                data: {
                    coordinators,
                    pagination: {
                        total,
                        page,
                        pageSize,
                        totalPages
                    }
                },
                message: "Coordinators retrieved successfully",
                code: 200,
            });
        } catch (error: any) {
            return AppResponse.sendError({
                res: res,
                data: null,
                message: `Internal server error: ${error.message}`,
                code: 500,
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const coordinator = await CoordinatorDeleteAction.execute(parseInt(id));

            if (!coordinator) {
                return AppResponse.sendError({
                    res: res,
                    data: null,
                    message: "Coordinator not found or already deleted",
                    code: 404,
                });
            }

            return AppResponse.sendSuccess({
                res: res,
                data: coordinator,
                message: "Coordinator deleted successfully",
                code: 200,
            });
        } catch (error: any) {
            return AppResponse.sendError({
                res: res,
                data: null,
                message: `Internal server error: ${error.message}`,
                code: 500,
            });
        }
    }
}

export default CoordinatorController;
