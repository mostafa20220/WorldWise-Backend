import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/helpers";
import { AuthRequest, Payload } from "../types/types";

export const verifyRefreshToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const REFRESH_TOKEN = req.cookies?.REFRESH_TOKEN as string;
  
  // console.log("REFRESH_TOKEN: ", REFRESH_TOKEN);

  // refresh token is required
  if (!REFRESH_TOKEN)
    return next(new AppError(401, "fail", "REFRESH_TOKEN is Required"));

  try {
    const decoded = jwt.verify(
      REFRESH_TOKEN,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;

    // renew the token
    delete decoded.iat;
    delete decoded.exp;

    req.payload = decoded as Payload;
    next();
  } catch (err) {
    // console.log("verify token - err: ", err);
    next(new AppError(401, "fail", "Invalid Refresh Token"));
  }
};
