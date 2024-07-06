import express from "express";
import testRouter from "./Test";
import adminRoute from "./admin";
import dutyRoute from "./duty";
import semRouter from "./semester";

const routes = express.Router();

routes.use("/", testRouter);
routes.use("/admin", adminRoute);
routes.use("/duty", dutyRoute);
routes.use("/semester", semRouter);
export default routes;
