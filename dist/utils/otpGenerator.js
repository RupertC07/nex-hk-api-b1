"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateOtp = (length) => {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber.toString().padStart(length, "0");
};
exports.default = generateOtp;
//# sourceMappingURL=otpGenerator.js.map