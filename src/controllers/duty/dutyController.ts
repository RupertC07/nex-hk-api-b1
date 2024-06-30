import { Request, Response } from "express";
import AppResponse from "../../utils/AppResponse";
import config from "../../config";
import DutyCreateAction from "../../actions/duty/dutyCreateAction";
import DutyUpdateAction from "../../actions/duty/dutyUpdateAction";
import DutyGetAction from "../../actions/duty/dutyGetAction";
import { date } from "joi";
import DutyListAction from "../../actions/duty/dutyListAction";
import DutyDeleteAction from "../../actions/duty/dutyDeleteAction";

class DutyController {
  async get(req: Request, res: Response) {
    try {
      const admin = req.adminData;
      const dutyId = req.params.id;

      const duty = await DutyGetAction.execute(parseInt(dutyId));

      if (!duty) {
        return AppResponse.sendError({
          res: res,
          data: null,
          message: "Duty not found",
          code: 404,
        });
      }

      return AppResponse.sendSuccess({
        res: res,
        data: duty,
        message: "Duty has been successfully fetched",
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
  async create(req: Request, res: Response) {
    try {
      const admin = req.adminData;

      const validData = DutyCreateAction.validate(req.body);

      if (validData.error) {
        return AppResponse.sendError({
          res: res,
          data: null,
          message: validData.error.errors[0].message,
          code: 400,
        });
      }

      const isValid = await DutyCreateAction.validDuty(validData.data.name);

      if (!isValid) {
        return AppResponse.sendError({
          res: res,
          data: null,
          message: "Duty type already exists",
          code: 400,
        });
      }

      const duty = await DutyCreateAction.execute(req.body);

      return AppResponse.sendSuccess({
        res: res,
        data: duty,
        message: "Duty has been successfully created",
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
  async update(req: Request, res: Response) {
    try {
      const admin = req.adminData;
      const dutyId = req.params.id;

      const duty_info = await DutyGetAction.execute(parseInt(dutyId));

      if (!duty_info) {
        return AppResponse.sendError({
          res: res,
          data: null,
          message: "Duty not found",
          code: 404,
        });
      }

      const validData = DutyUpdateAction.validate(req.body);

      if (validData.error) {
        return AppResponse.sendError({
          res: res,
          data: null,
          message: validData.error.errors[0].message,
          code: 400,
        });
      }

      const isValid = await DutyUpdateAction.validDuty(
        validData.data.name,
        duty_info.id
      );

      if (!isValid) {
        return AppResponse.sendError({
          res: res,
          data: null,
          message: "Duty type already exists",
          code: 400,
        });
      }

      const duty = await DutyUpdateAction.execute(req.body, duty_info.id);

      return AppResponse.sendSuccess({
        res: res,
        data: duty,
        message: "Duty has been successfully update",
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
      const admin = req.adminData;
      const dutyId = req.params.id;

      const duty = await DutyGetAction.execute(parseInt(dutyId));

      if (!duty) {
        return AppResponse.sendError({
          res: res,
          data: null,
          message: "Duty not found",
          code: 404,
        });
      }

      const delete_duty = await DutyDeleteAction.execute(duty.id);

      return AppResponse.sendSuccess({
        res: res,
        data: delete_duty,
        message: "Duty has been successfully deleted",
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
      const admin = req.adminData;
      const search = req.query.search ? req.query.search.toString() : null; // Ensure search is either a string or undefined
      const perPage = req.query.perPage
        ? parseInt(req.query.perPage as string)
        : 5; // Parse perPage as number or undefined
      const page = req.query.page ? parseInt(req.query.page as string) : 1; // Parse page as number or undefined

      const duties = await DutyListAction.execute({ search, page, perPage });

      return AppResponse.sendSuccess({
        res: res,
        data: duties,
        message: "Duties has been successfully fetched",
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

export default DutyController;
