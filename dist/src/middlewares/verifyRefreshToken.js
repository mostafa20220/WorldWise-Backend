"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("../utils/helpers");
const verifyRefreshToken = (req, res, next) => {
    const REFRESH_TOKEN = req.cookies?.REFRESH_TOKEN;
    // console.log("REFRESH_TOKEN: ", REFRESH_TOKEN);
    // refresh token is required
    if (!REFRESH_TOKEN)
        return next(new helpers_1.AppError(401, "fail", "REFRESH_TOKEN is Required"));
    try {
        const decoded = jsonwebtoken_1.default.verify(REFRESH_TOKEN, process.env.JWT_SECRET);
        // renew the token
        delete decoded.iat;
        delete decoded.exp;
        req.payload = decoded;
        next();
    }
    catch (err) {
        // console.log("verify token - err: ", err);
        next(new helpers_1.AppError(401, "fail", "Invalid Refresh Token"));
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
