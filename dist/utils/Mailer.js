"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../config/index"));
const ejs_1 = __importDefault(require("ejs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const nodemailer = require("nodemailer");
class Mailer {
    sendEmail(receiver, subject, data, templateName, plainText) {
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: index_1.default.email.address,
                    pass: index_1.default.email.password,
                },
            });
            let content = null;
            if (templateName) {
                const templatePath = path_1.default.resolve(__dirname, `../views/email/${templateName}.ejs`);
                const template = fs_1.default.readFileSync(templatePath, "utf8");
                // Render the EJS template with provided data
                content = ejs_1.default.render(template, { data });
            }
            if (!plainText && !content) {
                return reject(new Error("No content provided for email."));
            }
            const mailOptions = {
                from: "NEXHK",
                to: receiver,
                subject: subject,
                text: plainText !== null && plainText !== void 0 ? plainText : undefined,
                html: content !== null && content !== void 0 ? content : undefined,
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                    reject(error); // Reject the promise if there's an error
                }
                else {
                    console.log("Email sent:", info.response);
                    resolve(true); // Resolve the promise if email sent successfully
                }
            });
        });
    }
    testSender(message, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const subject = "This is a sample sample email";
            const data = { message: message };
            return yield this.sendEmail(email, subject, data, "index");
        });
    }
    sendVerificationCode(code, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const subject = "Verify your account";
            const content = `This is your verification code : ${code}. Do not share this to others`;
            return yield this.sendEmail(email, subject, null, null, content);
        });
    }
    testSenderNoHtml(message, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const subject = "This is a sample sample email";
            // const data = { message: message };
            return yield this.sendEmail(email, subject, null, null, message);
        });
    }
}
exports.default = Mailer;
//# sourceMappingURL=Mailer.js.map