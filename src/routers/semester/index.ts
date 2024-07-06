import { Router } from "express";
import SemesterController from "../../controllers/semester/semesterController";
import apiKeyAuth from "../../middlewares/apiKey";
import AdminMiddleware from "../../middlewares/admin";

const semRouter = Router();
const semController = new SemesterController();

semRouter.post(
  "/",
  apiKeyAuth,
  AdminMiddleware.authToken,
  semController.create
);
semRouter.put(
  "/activate/:id",
  apiKeyAuth,
  AdminMiddleware.authToken,
  semController.activate
);
semRouter.put(
  "/deactivate",
  apiKeyAuth,
  AdminMiddleware.authToken,
  semController.deactivate
);
semRouter.put(
  "/:id",
  apiKeyAuth,
  AdminMiddleware.authToken,
  semController.update
);
semRouter.get("/", apiKeyAuth, AdminMiddleware.authToken, semController.list);
semRouter.get(
  "/active",
  apiKeyAuth,
  AdminMiddleware.authToken,
  semController.showActive
);
semRouter.get(
  "/:id",
  apiKeyAuth,
  AdminMiddleware.authToken,
  semController.show
);
semRouter.delete(
  "/:id",
  apiKeyAuth,
  AdminMiddleware.authToken,
  semController.delete
);

export default semRouter;
