"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowTo = void 0;
const helpers_1 = require("../utils/helpers");
const verifyTokens_1 = require("./verifyTokens");
const verifyRefreshToken_1 = require("./verifyRefreshToken");
const allowTo = (...roles) => {
    return (req, res, next) => {
        (0, verifyTokens_1.verifyTokens)(req, res, next);
        const user = req?.payload;
        // console.log("from verify, user: ", user);
        if (!user)
            return next(new helpers_1.AppError(401, "fail", "req.payload is undefined"));
        if (!roles.includes(user.role) && !roles.includes("all")) {
            return next(new helpers_1.AppError(403, "fail", "You are not authorized to do this action"));
        }
        next();
        verifyRefreshToken_1.verifyRefreshToken;
    };
};
exports.allowTo = allowTo;
