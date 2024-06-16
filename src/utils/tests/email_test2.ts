import Mailer from "../Mailer";

const mailer = new Mailer();

const receiver = "rupertcaingal.dev@gmail.com";
const message = "This is a test email";

mailer.testSenderNoHtml(message, receiver);
