import express from "express";
import testRouter from "./Test";
import adminRoute from "./admin";
import dutyRoute from "./duty";

const routes = express.Router();

routes.use("/", testRouter);
routes.use("/admin", adminRoute);
routes.use("/duty", dutyRoute);

export default routes;
