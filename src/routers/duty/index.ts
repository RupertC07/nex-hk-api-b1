import { Router } from "express";
import DutyController from "../../controllers/duty/dutyController";
import apiKeyAuth from "../../middlewares/apiKey";
import AdminMiddleware from "../../middlewares/admin";

const dutyRoute = Router();
const dutyController = new DutyController();

dutyRoute.post(
  "/",
  apiKeyAuth,
  AdminMiddleware.authToken,
  dutyController.create
);
dutyRoute.put(
  "/:id",
  apiKeyAuth,
  AdminMiddleware.authToken,
  dutyController.update
);
dutyRoute.delete(
  "/:id",
  apiKeyAuth,
  AdminMiddleware.authToken,
  dutyController.delete
);
dutyRoute.get("/", apiKeyAuth, AdminMiddleware.authToken, dutyController.list);

dutyRoute.get(
  "/:id",
  apiKeyAuth,
  AdminMiddleware.authToken,
  dutyController.get
);

export default dutyRoute;
