"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putCity = exports.patchCity = exports.postCity = exports.deleteCity = exports.getCity = exports.getAllCities = void 0;
const express_validator_1 = require("express-validator");
const cityIdValidator = (0, express_validator_1.param)("cityId")
    .exists()
    .isString()
    .withMessage("Invalid City Id");
exports.getAllCities = [
    (0, express_validator_1.query)("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("page should be positive integer"),
    (0, express_validator_1.query)("limit")
        .optional()
        .isInt({ min: 1 })
        .withMessage("limit should be positive integer"),
];
exports.getCity = cityIdValidator;
exports.deleteCity = cityIdValidator;
//TODO: handle position validation
// const city: City = {
//   cityName: string;
//     country: string;
//     emoji: string;
//     date: string;
//     notes: string;
//     position: {
//         lat: number;
//         lng: number;
// };
// };
exports.postCity = [
    (0, express_validator_1.body)("cityName")
        .trim()
        .isString()
        .withMessage("Invalid Request Body, 'cityName' should be string")
        .notEmpty()
        .withMessage("Invalid Request Body, 'cityName' should be provided"),
    (0, express_validator_1.body)("country")
        .trim()
        .isString()
        .withMessage("Invalid Request Body, 'country' should be string")
        .notEmpty()
        .withMessage("Invalid Request Body, 'country' should be provided"),
    (0, express_validator_1.body)("emoji")
        .trim()
        .isString()
        .withMessage("Invalid Request Body, 'emoji' should be string")
        .notEmpty()
        .withMessage("Invalid Request Body, 'emoji' should be provided"),
    (0, express_validator_1.body)("date")
        .trim()
        .isISO8601()
        .withMessage("Invalid Request Body, 'date' should be Date format (ISO8601)")
        .notEmpty()
        .withMessage("Invalid Request Body, 'date' should be provided"),
    (0, express_validator_1.body)("notes")
        .optional()
        .trim()
        .isString()
        .withMessage("Invalid Request Body, 'notes' should be string")
    // .notEmpty()
    // .withMessage("Invalid Request Body, 'notes' should be provided"),
    ,
    (0, express_validator_1.body)("position.lat")
        .isNumeric()
        .withMessage("Invalid Request Body, 'lat' should be number")
        .notEmpty()
        .withMessage("Invalid Request Body, 'lat' should be provided"),
    (0, express_validator_1.body)("position.lng")
        .isNumeric()
        .withMessage("Invalid Request Body, 'lng' should be number")
        .notEmpty()
        .withMessage("Invalid Request Body, 'lng' should be provided")
];
exports.patchCity = [
    (0, express_validator_1.body)("cityName")
        .optional()
        .trim()
        .isString()
        .withMessage("Invalid Request Body, 'cityName' should be string")
        .notEmpty()
        .withMessage("Invalid Request Body, 'cityName' should be provided"),
    (0, express_validator_1.body)("country")
        .optional()
        .trim()
        .isString()
        .withMessage("Invalid Request Body, 'country' should be string")
        .notEmpty()
        .withMessage("Invalid Request Body, 'country' should be provided"),
    (0, express_validator_1.body)("emoji")
        .optional()
        .trim()
        .isString()
        .withMessage("Invalid Request Body, 'emoji' should be string")
        .notEmpty()
        .withMessage("Invalid Request Body, 'emoji' should be provided"),
    (0, express_validator_1.body)("date")
        .optional()
        .trim()
        .isDate()
        .withMessage("Invalid Request Body, 'date' should be Date")
        .notEmpty()
        .withMessage("Invalid Request Body, 'date' should be provided"),
    (0, express_validator_1.body)("notes")
        .optional()
        .trim()
        .isString()
        .withMessage("Invalid Request Body, 'notes' should be string")
        .notEmpty()
        .withMessage("Invalid Request Body, 'notes' should be provided"),
    (0, express_validator_1.body)("position")
        .optional()
        .trim()
        .isObject({ strict: true }) //! I don't know how to (VALIDATE an OBJECT) using express-validator yet!
        .withMessage("Invalid Request Body, 'position' should be object")
        .notEmpty()
        .withMessage("Invalid Request Body, 'position' should be provided")
];
exports.putCity = [cityIdValidator, ...exports.postCity];
