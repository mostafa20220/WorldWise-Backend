import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { AppError } from "../utils/helpers";

type asyncType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response<any, Record<string, any>> | undefined | void>;

export function asyncWrapper(fn: asyncType) {
  return (req: Request, res: Response, next: NextFunction) => {
    
    //  Request Validation
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      next(new AppError(400, "fail", validationErrors.array()));

    // run the controller and catch any runtime errors
    fn(req, res, next).catch((err) => next(err));    
  };
}
