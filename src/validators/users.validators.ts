import { param, body, query } from "express-validator";

const userIdValidator = param("userId")
  .optional()
  .exists()
  .isString()
  .withMessage("Invalid User Id");

export const getAllUsers = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page should be positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("limit should be positive integer"),
];

export const getUser = userIdValidator;

export const deleteUser = userIdValidator;

export const patchUser = [
  body("firstName")
    .optional()
    .trim()
    .isString()
    .withMessage("Invalid Request Body, 'firstName' should be string")
    .notEmpty()
    .withMessage("Invalid Request Body, 'firstName' should be provided"),
  body("lastName")
    .optional()
    .trim()
    .isString()
    .withMessage("Invalid Request Body, 'lastName' should be string")
    .notEmpty()
    .withMessage("Invalid Request Body, 'lastName' should be provided"),
  body("avatar") 
    .optional()
    .trim()
    .isString()
    .withMessage("Invalid Request Body, 'avatar' should be string")
    .notEmpty()
    .withMessage("Invalid Request Body, 'avatar' should be provided"),
  body("shareMode")
    .optional()
    .isBoolean()
    .withMessage("Invalid Request Body, 'shareMode' should be boolean")
    .notEmpty()
    .withMessage("Invalid Request Body, 'shareMode' should be provided"),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Invalid Request Body, 'email' should be valid email")
    .notEmpty()
    .withMessage("Invalid Request Body, 'email' should be provided"),
  body("password")
    .optional()
    .trim()
    .isString()
    .withMessage("Invalid Request Body, 'password' should be string")
    .notEmpty()
    .withMessage("Invalid Request Body, 'password' should be provided")
    .isLength({ min: 4 }),
  body("role")
    .optional()
    .trim()
    .isIn(["user", "admin", "manager"])
    .withMessage("Invalid Request Body, 'role' should be valid role: 'user' or 'admin' or 'manager' ")
    .notEmpty()
    .withMessage("Invalid Request Body, 'role' should be provided"),
];
