import { Request, Response } from "express";
import config from "../../config";
import AppResponse from "../../utils/AppResponse";
import SemesterCreateAction from "../../actions/semester/semesterCreateAction";
import prisma from "../../utils/client";
import DeactivateSemesterAction from "../../actions/semester/deactivateSemesterAction";
import UpdateSemesterAction from "../../actions/semester/updateSemesterAction";
import ShowSemesterAction from "../../actions/semester/showSemesterAction";
import SemesterListAction from "../../actions/semester/semesterListAction";
import ShowActiveSemAction from "../../actions/semester/showActiveSemAction";
import ActivateSemesterAction from "../../actions/semester/activateSemesterAction";
import DeleteSemesterAction from "../../actions/semester/deleteSemesterAction";

class SemesterController {
  async create(req: Request, res: Response) {
    try {
      //   const admin = req.adminData;

      const validate = SemesterCreateAction.validate(req.body);
      if (validate.error) {
        return AppResponse.sendError({
          res,
          data: null,
          message: validate.error.errors[0].message,
          code: 400,
        });
      }

      const isValid = await SemesterCreateAction.validSem(req.body);
      if (!isValid) {
        return AppResponse.sendError({
          res,
          data: null,
          message: "Semester already exists",
          code: 400,
        });
      }

      const result = await prisma.$transaction(async (prisma) => {
        if (validate.data.status == "active") {
          await DeactivateSemesterAction.execute();
        }

        return await SemesterCreateAction.execute(req.body);
      });

      return AppResponse.sendSuccess({
        res,
        data: result,
        message: "Semeser has been successfully saved",
        code: 200,
      });
    } catch (error: any) {
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
  async update(req: Request, res: Response) {
    try {
      //   const admin = req.adminData;
      const semId = req.params.id ? parseInt(req.params.id) : null;

      const validate = UpdateSemesterAction.validate(req.body);

      const sem = await ShowSemesterAction.execute(semId);

      if (!sem) {
        return AppResponse.sendError({
          res,
          data: null,
          message: "Semester not found",
          code: 404,
        });
      }

      if (validate.error) {
        return AppResponse.sendError({
          res,
          data: null,
          message: validate.error.errors[0].message,
          code: 400,
        });
      }

      const isValid = await UpdateSemesterAction.validSem(req.body, semId);

      if (!isValid) {
        return AppResponse.sendError({
          res,
          data: null,
          message: "Semester already exists",
          code: 400,
        });
      }

      const updatedData = await UpdateSemesterAction.execute(sem.id, req.body);

      return AppResponse.sendSuccess({
        res,
        data: updatedData,
        message: "Semeser has been successfully saved",
        code: 201,
      });
    } catch (error: any) {
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

  async show(req: Request, res: Response) {
    try {
      //   const admin = req.adminData;
      const semId = req.params.id ? parseInt(req.params.id) : null;

      const semester = await ShowSemesterAction.execute(semId);

      if (!semester) {
        return AppResponse.sendError({
          res,
          data: null,
          message: "Semester not found",
          code: 404,
        });
      }
      return AppResponse.sendSuccess({
        res,
        data: semester,
        message: "Semeser has been successfully fetched",
        code: 200,
      });
    } catch (error: any) {
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
  async list(req: Request, res: Response) {
    try {
      //   const admin = req.adminData;
      const search = req.query.search ? req.query.search.toString() : null; // Ensure search is either a string or undefined
      const perPage = req.query.perPage
        ? parseInt(req.query.perPage as string)
        : 5; // Parse perPage as number or undefined
      const page = req.query.page ? parseInt(req.query.page as string) : 1; // Parse page as number or undefined

      const sem = await SemesterListAction.execute({ search, page, perPage });

      return AppResponse.sendSuccess({
        res: res,
        data: sem,
        message: "Semesters has been successfully fetched",
        code: 200,
      });
    } catch (error: any) {
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

  async showActive(req: Request, res: Response) {
    try {
      //   const admin = req.adminData;
      const activeSem = await ShowActiveSemAction.execute();
      return AppResponse.sendSuccess({
        res,
        data: activeSem,
        message: "Semester has been successfully fetched",
        code: 200,
      });
    } catch (error: any) {
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
  async activate(req: Request, res: Response) {
    try {
      //   const admin = req.adminData;
      const semId = req.params.id ? parseInt(req.params.id) : null;

      const semester = await ShowSemesterAction.execute(semId);

      if (!semester) {
        return AppResponse.sendError({
          res,
          data: null,
          message: "Semester not found",
          code: 404,
        });
      }

      const result = await prisma.$transaction(async (prisma) => {
        await DeactivateSemesterAction.execute();
        return await ActivateSemesterAction.execute(semester.id);
      });

      return AppResponse.sendSuccess({
        res,
        data: result,
        message: "Semester has been successfully active",
        code: 200,
      });
    } catch (error: any) {
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
  async deactivate(req: Request, res: Response) {
    try {
      //   const admin = req.adminData;
      const activeSem = await DeactivateSemesterAction.execute();
      return AppResponse.sendSuccess({
        res,
        data: null,
        message: "Semester has been successfully deactivate",
        code: 200,
      });
    } catch (error: any) {
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
  async delete(req: Request, res: Response) {
    try {
      //   const admin = req.adminData;
      const semId = req.params.id ? parseInt(req.params.id) : null;

      const semester = await ShowSemesterAction.execute(semId);

      if (!semester) {
        return AppResponse.sendError({
          res,
          data: null,
          message: "Semester not found",
          code: 404,
        });
      }

      await DeleteSemesterAction.execute(semester.id);
      return AppResponse.sendSuccess({
        res,
        data: null,
        message: "Semeser has been successfully removed",
        code: 200,
      });
    } catch (error: any) {
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

export default SemesterController;
