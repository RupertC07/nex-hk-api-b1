import { Router } from "express";
import SemesterController from "../../controllers/semester/semesterController";

const semRouter = Router();
const semController = new SemesterController();

semRouter.post("/", semController.create);
semRouter.put("/activate/:id", semController.activate);
semRouter.put("/deactivate", semController.deactivate);
semRouter.put("/:id", semController.update);
semRouter.get("/", semController.list);
semRouter.get("/active", semController.showActive);
semRouter.get("/:id", semController.show);
semRouter.delete("/:id", semController.delete);

export default semRouter;
