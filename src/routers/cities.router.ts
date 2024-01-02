import express from "express";
import * as validator from "../validators/cities.validators";
import * as controller from "../controllers/cities.controller";
import { allowTo } from "../middlewares/allowTo";

export const citiesRouter = express.Router();

citiesRouter
  .route("/")
  .post(allowTo("user"), validator.postCity, controller.postCity);

citiesRouter
  .route("/:cityId")
  .get(allowTo("user"), validator.getCity, controller.getCity)
  .patch(allowTo("user"), validator.patchCity, controller.patchCity)
  .delete(allowTo("user"), validator.deleteCity, controller.deleteCity);
