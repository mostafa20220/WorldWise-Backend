"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.createRes = void 0;
const createRes = (status, dataOrError, code = 200) => {
    if (status === "success")
        return { status, data: dataOrError };
    if (status === "error" || status === "fail")
        return { status, data: null, code, error: dataOrError };
    throw new Error("Unhandled Status: " + status);
};
exports.createRes = createRes;
class AppError extends Error {
    code;
    statusText;
    constructor(code, statusText, message) {
        super();
        this.code = code;
        this.statusText = statusText;
        this.message = Array.isArray(message) ? message.map((error) => error.msg).join(", ") : message;
    }
}
exports.AppError = AppError;
