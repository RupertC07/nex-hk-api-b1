import express from "express";
import testRouter from "./Test";
import adminRoute from "./admin";
import campusRoute from "./campus";
import coordinatorRoute from "./coordinator";
const routes = express.Router();

routes.use("/", testRouter);
routes.use("/admin", adminRoute);
routes.use("/campus", campusRoute);
routes.use("/coordinator", coordinatorRoute)
export default routes;
