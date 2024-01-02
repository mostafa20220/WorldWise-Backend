import { NextFunction, Response } from "express";
import { AppError } from "../utils/helpers";
import { AuthRequest, Role } from "../types/types";
import { verifyTokens } from "./verifyTokens";
import { verifyRefreshToken } from "./verifyRefreshToken";

export const allowTo = (...roles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    verifyTokens(req, res, next);

    const user = req?.payload;
    // console.log("from verify, user: ", user);
    if (!user)
      return next(new AppError(401, "fail", "req.payload is undefined"));
    if (!roles.includes(user.role) && !roles.includes("all")) {
      return next(
        new AppError(403, "fail", "You are not authorized to do this action")
      );
    }
    next();
    verifyRefreshToken;
  };
};
