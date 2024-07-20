"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Test_1 = __importDefault(require("./Test"));
const admin_1 = __importDefault(require("./admin"));
const campus_1 = __importDefault(require("./campus"));
const coordinator_1 = __importDefault(require("./coordinator"));
const duty_1 = __importDefault(require("./duty"));
const semester_1 = __importDefault(require("./semester"));
const routes = express_1.default.Router();
routes.use("/", Test_1.default);
routes.use("/admin", admin_1.default);
routes.use("/campus", campus_1.default);
routes.use("/coordinator", coordinator_1.default);
routes.use("/duty", duty_1.default);
routes.use("/semester", semester_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map