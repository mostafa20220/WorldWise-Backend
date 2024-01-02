import { body, header, cookie } from "express-validator";

export const register = [
  body("firstName")
    .trim()
    .isString()
    .withMessage("Invalid Request Body, 'firstName' should be string")
    .notEmpty()
    .withMessage("Invalid Request Body, 'firstName' should be provided"),
  body("lastName")
    .trim()
    .isString()
    .withMessage("Invalid Request Body, 'lastName' should be string")
    .notEmpty()
    .withMessage("Invalid Request Body, 'lastName' should be provided"),
  
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid Request Body, 'email' should be valid email")
    .notEmpty()
    .withMessage("Invalid Request Body, 'email' should be provided"),
  body("password")
    .trim()
    .isString()
    .withMessage("Invalid Request Body, 'password' should be string")
    .notEmpty()
    .withMessage("Invalid Request Body, 'password' should be provided")
    .isLength({ min: 4 }),
];

export const login = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid Request Body, 'email' should be valid email")
    .notEmpty()
    .withMessage("Invalid Request Body, 'email' should be provided"),
  body("password")
    .trim()
    .isString()
    .withMessage("Invalid Request Body, 'password' should be string")
    .notEmpty()
    .withMessage("Invalid Request Body, 'password' should be provided")
    .isLength({ min: 4 }),
];

export const refresh = [
  cookie("REFRESH_TOKEN").exists().withMessage("Invalid Request, 'REFRESH_TOKEN' should be provided"),
];

export const logout = [
  header("Authorization")
    .exists()
    .withMessage("Invalid Request, 'Authorization' header should be provided"),
];