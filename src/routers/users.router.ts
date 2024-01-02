import express from "express";
import * as validator from "../validators/users.validators";
import * as controller from "../controllers/users.controller";
import { allowTo } from "../middlewares/allowTo";

export const usersRouter = express.Router();

usersRouter
  .route("/")
  .get(allowTo("admin"), validator.getAllUsers, controller.getAllUsers);

usersRouter
  .route("/:userId")
  .get(validator.getUser, controller.getUser)
  .patch(allowTo("all"), validator.patchUser, controller.patchUser)
  .delete(allowTo("admin"), validator.deleteUser, controller.deleteUser);
