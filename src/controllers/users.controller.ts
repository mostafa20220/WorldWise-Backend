import { NextFunction, Request, Response } from "express";
import { userModel } from "../models/users.model";
import { AuthRequest, User } from "../types/types";
import { AppError, createRes } from "../utils/helpers";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

export const getAllUsers = asyncWrapper(async (req: Request, res: Response) => {
  // paging feature
  const page = +req.query.page! || 1; // add ! to tell typescript that page is not undefined
  const limit = +req.query.limit! || 5; // add ! to tell typescript that limit is not undefined
  const skipAmount = (page - 1) * limit;

  const data = await userModel
    .find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skipAmount); // using projection to hide __v

  res.json({ status: "success", date: { users: data } });
});

export const getUser = asyncWrapper(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.params?.userId;

    const user = await userModel.findOne(
      { _id: userId },
      { __v: false, password: false, REFRESH_TOKEN: false, role: false }
    );

    if (!user) return next(new AppError(404, "fail", "User Not Found"));
    if (!user?.shareMode)
      return next(new AppError(403, "fail", "User Not Shared"));

    res.json(createRes("success", { user }));
  }
);

export const patchUser = asyncWrapper(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    // get the data
    const userId = req.params?.userId;

    if (userId !== req.payload?.id) {
      next(
        new AppError(403, "fail", "You are not authorized to do this action")
      );
    }

    const { firstName, lastName, avatar, shareMode, email, password } =
      req.body;

    const user: User = {};

    if (
      firstName === undefined &&
      lastName === undefined &&
      email === undefined &&
      password === undefined &&
      avatar === undefined &&
      shareMode === undefined
    )
      next(
        new AppError(
          400,
          "fail",
          "Invalid Request Body, either firstName or lastName or email or password must be provided"
        )
      );

    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (email !== undefined) user.email = email;
    if (password !== undefined) user.password = bcrypt.hashSync(password, 10);
    if (avatar !== undefined) user.avatar = avatar;
    if (shareMode !== undefined) user.shareMode = shareMode;

    // apply the change to the database.
    const dbRes = await userModel.updateOne({ _id: userId }, user);
    const updatedUser = await userModel.findOne(
      { _id: userId },
      { __v: false, password: false }
    );

    if (!dbRes.matchedCount)
      next(new AppError(500, "error", "User Not Found In DB"));
    else res.json(createRes("success", { updatedUser }));
  }
);

export const deleteUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params?.userId;

    const dbRes = await userModel.deleteOne({ _id: userId });

    if (!dbRes.deletedCount) next(new AppError(400, "fail", "User Not Found"));
    else res.status(200).json(createRes("success", dbRes));
  }
);
