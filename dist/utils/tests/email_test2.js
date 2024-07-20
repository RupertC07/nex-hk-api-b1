"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mailer_1 = __importDefault(require("../Mailer"));
const mailer = new Mailer_1.default();
const receiver = "rupertcaingal.dev@gmail.com";
const message = "This is a test email";
mailer.testSenderNoHtml(message, receiver);
//# sourceMappingURL=email_test2.js.map