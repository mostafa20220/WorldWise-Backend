"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refresh = exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
exports.register = [
    (0, express_validator_1.body)("firstName")
        .trim()
        .isString()
        .withMessage("Invalid Request Body, 'firstName' should be string")
        .notEmpty()
        .withMessage("Invalid Request Body, 'firstName' should be provided"),
    (0, express_validator_1.body)("lastName")
        .trim()
        .isString()
        .withMessage("Invalid Request Body, 'lastName' should be string")
        .notEmpty()
        .withMessage("Invalid Request Body, 'lastName' should be provided"),
    (0, express_validator_1.body)("email")
        .trim()
        .isEmail()
        .withMessage("Invalid Request Body, 'email' should be valid email")
        .notEmpty()
        .withMessage("Invalid Request Body, 'email' should be provided"),
    (0, express_validator_1.body)("password")
        .trim()
        .isString()
        .withMessage("Invalid Request Body, 'password' should be string")
        .notEmpty()
        .withMessage("Invalid Request Body, 'password' should be provided")
        .isLength({ min: 4 }),
];
exports.login = [
    (0, express_validator_1.body)("email")
        .trim()
        .isEmail()
        .withMessage("Invalid Request Body, 'email' should be valid email")
        .notEmpty()
        .withMessage("Invalid Request Body, 'email' should be provided"),
    (0, express_validator_1.body)("password")
        .trim()
        .isString()
        .withMessage("Invalid Request Body, 'password' should be string")
        .notEmpty()
        .withMessage("Invalid Request Body, 'password' should be provided")
        .isLength({ min: 4 }),
];
exports.refresh = [
    (0, express_validator_1.cookie)("REFRESH_TOKEN").exists().withMessage("Invalid Request, 'REFRESH_TOKEN' should be provided"),
];
exports.logout = [
    (0, express_validator_1.header)("Authorization")
        .exists()
        .withMessage("Invalid Request, 'Authorization' header should be provided"),
];
