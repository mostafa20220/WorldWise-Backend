"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("../utils/helpers");
const verifyTokens = (req, res, next) => {
    const authHeader = (req.headers.authorization ??
        req.headers.Authorization);
    const token = authHeader?.split(" ")[1];
    if (!token)
        return next(new helpers_1.AppError(401, "fail", "Access Token is Required"));
    const REFRESH_TOKEN = req.cookies?.REFRESH_TOKEN;
    if (!REFRESH_TOKEN)
        return next(new helpers_1.AppError(401, "fail", "REFRESH_TOKEN is Required"));
    let decodedRefreshToken;
    try {
        decodedRefreshToken = jsonwebtoken_1.default.verify(REFRESH_TOKEN, process.env.JWT_SECRET);
        // renew the token
        delete decodedRefreshToken.iat;
        delete decodedRefreshToken.exp;
    }
    catch (err) {
        console.log("verify token - err: ", err);
        next(new helpers_1.AppError(401, "fail", "Invalid Refresh Token"));
    }
    let decodedAccessToken;
    try {
        decodedAccessToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // renew the token
        delete decodedAccessToken.iat;
        delete decodedAccessToken.exp;
    }
    catch (err) {
        console.log("verify token - err: ", err);
        return next(new helpers_1.AppError(401, "fail", "Invalid Access Token"));
    }
    if (JSON.stringify(decodedAccessToken) !== JSON.stringify(decodedRefreshToken))
        return next(new helpers_1.AppError(401, "fail", "Invalid Tokens"));
    req.payload = decodedAccessToken;
};
exports.verifyTokens = verifyTokens;
