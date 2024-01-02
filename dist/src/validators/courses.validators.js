"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putCourse = exports.patchCourse = exports.postCourse = exports.deleteCourse = exports.getCourse = exports.getAllCourses = void 0;
const express_validator_1 = require("express-validator");
const courseIdValidator = (0, express_validator_1.param)("courseId")
    .exists()
    .isString()
    .withMessage("Invalid Course Id");
exports.getAllCourses = [(0, express_validator_1.query)("page").optional().isInt({ min: 1 }).withMessage("page should be positive integer"),
    (0, express_validator_1.query)("limit").optional().isInt({ min: 1 }).withMessage("limit should be positive integer")
];
exports.getCourse = courseIdValidator;
exports.deleteCourse = courseIdValidator;
exports.postCourse = [
    (0, express_validator_1.body)("name")
        .trim()
        .isString()
        .withMessage("Invalid Request Body, 'name' should be string")
        .notEmpty()
        .withMessage("Invalid Request Body, 'name' should be provided"),
    (0, express_validator_1.body)("price")
        .notEmpty()
        .withMessage("Invalid Request Body, 'price' should be provided")
        .isFloat({ min: 0 })
        .withMessage("Invalid Request body, 'price' should be a positive number"),
];
exports.patchCourse = [
    (0, express_validator_1.body)("name")
        .trim()
        .optional()
        .isString()
        .withMessage("Invalid Request Body, 'name' should be string")
        .notEmpty()
        .withMessage("Invalid Request Body, 'name' shouldn't be Empty"),
    (0, express_validator_1.body)("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Invalid Request body, 'price' should be a number"),
];
exports.putCourse = [courseIdValidator, ...exports.postCourse];
