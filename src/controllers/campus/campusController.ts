import { Request, Response } from "express";
import CampusCreateAction from "../../actions/campus/campusCreateAction"
import CampusUpdateAction from "../../actions/campus/campusUpdateAction";
import CampusShowAction from "../../actions/campus/campusShowAction";
import CampusListAction from "../../actions/campus/campusListAction";
import CampusDeleteAction from "../../actions/campus/campusDeleteAction";
import AppResponse from "../../utils/AppResponse";

class CampusController {
    async create(req: Request, res: Response) {
        try {
            const validation = CampusCreateAction.validate(req.body)

            if (!validation.success) {
                return AppResponse.sendError({
                    res: res,
                    data: null,
                    message: `Validation error : ${validation.error.errors.map((err) => err.message).join(", ")}`,
                    code: 400,
                });
            }
            const campus = await CampusCreateAction.execute(req.body);

            return AppResponse.sendSuccess({
                res: res,
                data: campus,
                message: "Campus created successfully",
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
            const validation = CampusUpdateAction.validate(req.body);

            if (!validation.success) {
                return AppResponse.sendError({
                    res: res,
                    data: null,
                    message: `Validation error: ${validation.error.errors.map((err) => err.message).join(", ")}`,
                    code: 400,
                });
            }

            const campus = await CampusUpdateAction.execute(parseInt(id), req.body);

            if (!campus) {
                return AppResponse.sendError({
                    res: res,
                    data: null,
                    message: "Campus not found",
                    code: 400
                })
            }

            return AppResponse.sendSuccess({
                res: res,
                data: campus,
                message: "Campus updated successfully",
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
            const campus = await CampusShowAction.execute(parseInt(id));

            if (!campus) {
                return AppResponse.sendError({
                    res: res,
                    data: null,
                    message: "Campus not found or has been deleted",
                    code: 404,
                });
            }

            return AppResponse.sendSuccess({
                res: res,
                data: campus,
                message: "Campus retrieved successfully",
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
            const { campuses, total } = await CampusListAction.execute(page, pageSize);

            if (!campuses) {
                return AppResponse.sendError({
                    res: res,
                    data: null,
                    message: "No campuses available",
                    code: 404,
                });
            }

            const totalPages = Math.ceil(total / pageSize);

            return AppResponse.sendSuccess({
                res: res,
                data: {
                    campuses,
                    pagination: {
                        total,
                        page,
                        pageSize,
                        totalPages
                    }
                },
                message: "Campuses retrieved successfully",
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
            const campus = await CampusDeleteAction.execute(parseInt(id));

            if (!campus) {
                return AppResponse.sendError({
                    res: res,
                    data: null,
                    message: "Campus not found or already deleted",
                    code: 404,
                });
            }

            return AppResponse.sendSuccess({
                res: res,
                data: campus,
                message: "Campus deleted successfully",
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

export default CampusController;