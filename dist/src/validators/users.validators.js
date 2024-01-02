"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchUser = exports.deleteUser = exports.getUser = exports.getAllUsers = void 0;
const express_validator_1 = require("express-validator");
const userIdValidator = (0, express_validator_1.param)("userId")
    .optional()
    .exists()
    .isString()
    .withMessage("Invalid User Id");
exports.getAllUsers = [
    (0, express_validator_1.query)("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("page should be positive integer"),
    (0, express_validator_1.query)("limit")
        .optional()
        .isInt({ min: 1 })
        .withMessage("limit should be positive integer"),
];
exports.getUser = userIdValidator;
exports.deleteUser = userIdValidator;
exports.patchUser = [
    (0, express_validator_1.body)("firstName")
        .optional()
        .trim()
        .isString()
        .withMessage("Invalid Request Body, 'firstName' should be string")
        .notEmpty()
        .withMessage("Invalid Request Body, 'firstName' should be provided"),
    (0, express_validator_1.body)("lastName")
        .optional()
        .trim()
        .isString()
        .withMessage("Invalid Request Body, 'lastName' should be string")
        .notEmpty()
        .withMessage("Invalid Request Body, 'lastName' should be provided"),
    (0, express_validator_1.body)("avatar")
        .optional()
        .trim()
        .isString()
        .withMessage("Invalid Request Body, 'avatar' should be string")
        .notEmpty()
        .withMessage("Invalid Request Body, 'avatar' should be provided"),
    (0, express_validator_1.body)("shareMode")
        .optional()
        .isBoolean()
        .withMessage("Invalid Request Body, 'shareMode' should be boolean")
        .notEmpty()
        .withMessage("Invalid Request Body, 'shareMode' should be provided"),
    (0, express_validator_1.body)("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("Invalid Request Body, 'email' should be valid email")
        .notEmpty()
        .withMessage("Invalid Request Body, 'email' should be provided"),
    (0, express_validator_1.body)("password")
        .optional()
        .trim()
        .isString()
        .withMessage("Invalid Request Body, 'password' should be string")
        .notEmpty()
        .withMessage("Invalid Request Body, 'password' should be provided")
        .isLength({ min: 4 }),
    (0, express_validator_1.body)("role")
        .optional()
        .trim()
        .isIn(["user", "admin", "manager"])
        .withMessage("Invalid Request Body, 'role' should be valid role: 'user' or 'admin' or 'manager' ")
        .notEmpty()
        .withMessage("Invalid Request Body, 'role' should be provided"),
];
