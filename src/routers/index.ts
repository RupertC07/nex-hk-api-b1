import express from "express";
import testRouter from "./Test";
import adminRoute from "./admin";

const routes = express.Router();

routes.use("/", testRouter);
routes.use("/admin", adminRoute);

export default routes;
