"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.patchUser = exports.getUser = exports.getAllUsers = void 0;
const users_module_1 = require("../modules/users.module");
const helpers_1 = require("../utils/helpers");
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.getAllUsers = (0, asyncWrapper_1.asyncWrapper)(async (req, res) => {
    // paging feature
    const page = +req.query.page || 1; // add ! to tell typescript that page is not undefined
    const limit = +req.query.limit || 5; // add ! to tell typescript that limit is not undefined
    const skipAmount = (page - 1) * limit;
    const data = await users_module_1.userModel
        .find({}, { __v: false, password: false })
        .limit(limit)
        .skip(skipAmount); // using projection to hide __v
    res.json({ status: "success", date: { users: data } });
});
exports.getUser = (0, asyncWrapper_1.asyncWrapper)(async (req, res, next) => {
    const userId = req.params?.userId;
    const user = await users_module_1.userModel.findOne({ _id: userId }, { __v: false, password: false, REFRESH_TOKEN: false, role: false });
    if (!user)
        return next(new helpers_1.AppError(404, "fail", "User Not Found"));
    if (!user?.shareMode)
        return next(new helpers_1.AppError(403, "fail", "User Not Shared"));
    res.json((0, helpers_1.createRes)("success", { user }));
});
exports.patchUser = (0, asyncWrapper_1.asyncWrapper)(async (req, res, next) => {
    // get the data
    const userId = req.params?.userId;
    if (userId !== req.payload?.id) {
        next(new helpers_1.AppError(403, "fail", "You are not authorized to do this action"));
    }
    const { firstName, lastName, avatar, shareMode, email, password } = req.body;
    const user = {};
    if (firstName === undefined &&
        lastName === undefined &&
        email === undefined &&
        password === undefined &&
        avatar === undefined &&
        shareMode === undefined)
        next(new helpers_1.AppError(400, "fail", "Invalid Request Body, either firstName or lastName or email or password must be provided"));
    if (firstName !== undefined)
        user.firstName = firstName;
    if (lastName !== undefined)
        user.lastName = lastName;
    if (email !== undefined)
        user.email = email;
    if (password !== undefined)
        user.password = bcrypt_1.default.hashSync(password, 10);
    if (avatar !== undefined)
        user.avatar = avatar;
    if (shareMode !== undefined)
        user.shareMode = shareMode;
    // apply the change to the database.
    const dbRes = await users_module_1.userModel.updateOne({ _id: userId }, user);
    const updatedUser = await users_module_1.userModel.findOne({ _id: userId }, { __v: false, password: false });
    if (!dbRes.matchedCount)
        next(new helpers_1.AppError(500, "error", "User Not Found In DB"));
    else
        res.json((0, helpers_1.createRes)("success", { updatedUser }));
});
exports.deleteUser = (0, asyncWrapper_1.asyncWrapper)(async (req, res, next) => {
    const userId = req.params?.userId;
    const dbRes = await users_module_1.userModel.deleteOne({ _id: userId });
    if (!dbRes.deletedCount)
        next(new helpers_1.AppError(400, "fail", "User Not Found"));
    else
        res.status(200).json((0, helpers_1.createRes)("success", dbRes));
});
