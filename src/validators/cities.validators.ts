import { param, body, query } from "express-validator";
import { City } from "../types/types";

const cityIdValidator = param("cityId")
  .exists()
  .isString()
  .withMessage("Invalid City Id");

export const getAllCities = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page should be positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("limit should be positive integer"),
];

export const getCity = cityIdValidator;

export const deleteCity = cityIdValidator;


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

export const postCity = [
  body("cityName")
    .trim()
    .isString()
    .withMessage("Invalid Request Body, 'cityName' should be string")
    .notEmpty()
    .withMessage("Invalid Request Body, 'cityName' should be provided"),
    body("country")
    .trim()
    .isString()
    .withMessage("Invalid Request Body, 'country' should be string")
    .notEmpty()
    .withMessage("Invalid Request Body, 'country' should be provided"),
    body("emoji")
    .trim()
    .isString()
    .withMessage("Invalid Request Body, 'emoji' should be string")
    .notEmpty()
    .withMessage("Invalid Request Body, 'emoji' should be provided"),
    body("date")
    .trim()
    .isISO8601()
    .withMessage("Invalid Request Body, 'date' should be Date format (ISO8601)")
    .notEmpty()
    .withMessage("Invalid Request Body, 'date' should be provided"),
    body("notes")
    .optional()
    .trim()
    .isString()
    .withMessage("Invalid Request Body, 'notes' should be string")
    // .notEmpty()
    // .withMessage("Invalid Request Body, 'notes' should be provided"),
    ,
    body("position.lat")
    .isNumeric()
    .withMessage("Invalid Request Body, 'lat' should be number")
    .notEmpty()
    .withMessage("Invalid Request Body, 'lat' should be provided"),
    body("position.lng")
    .isNumeric()
    .withMessage("Invalid Request Body, 'lng' should be number")
    .notEmpty()
    .withMessage("Invalid Request Body, 'lng' should be provided")
];

export const patchCity = [
  body("cityName")
  .optional()
    .trim()
    .isString()
    .withMessage("Invalid Request Body, 'cityName' should be string")
    .notEmpty()
    .withMessage("Invalid Request Body, 'cityName' should be provided"),
    body("country")
    .optional()
    .trim()
    .isString()
    .withMessage("Invalid Request Body, 'country' should be string")
    .notEmpty()
    .withMessage("Invalid Request Body, 'country' should be provided"),
    body("emoji")
    .optional()
    .trim()
    .isString()
    .withMessage("Invalid Request Body, 'emoji' should be string")
    .notEmpty()
    .withMessage("Invalid Request Body, 'emoji' should be provided"),
    body("date")
    .optional()
    .trim()
    .isDate()
    .withMessage("Invalid Request Body, 'date' should be Date")
    .notEmpty()
    .withMessage("Invalid Request Body, 'date' should be provided"),
    body("notes")
    .optional()
    .trim()
    .isString()
    .withMessage("Invalid Request Body, 'notes' should be string")
    .notEmpty()
    .withMessage("Invalid Request Body, 'notes' should be provided"),
    body("position")
    .optional()
    .trim()
    .isObject({strict:true}) //! I don't know how to (VALIDATE an OBJECT) using express-validator yet!
    .withMessage("Invalid Request Body, 'position' should be object")
    .notEmpty()
    .withMessage("Invalid Request Body, 'position' should be provided")
];

export const putCity = [cityIdValidator, ...postCity];
