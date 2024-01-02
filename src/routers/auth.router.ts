import { Router } from "express";
import * as validator from "../validators/auth.validators";
import * as controller from "../controllers/auth.controller";
import { allowTo } from "../middlewares/allowTo";
import { upload } from "../middlewares/upload";
import { verifyRefreshToken } from "../middlewares/verifyRefreshToken";
import { verifyTokens } from "../middlewares/verifyTokens";

export const authRouter = Router();

authRouter
  .route("/register")
  .post(upload.single("avatar"), validator.register, controller.register);
authRouter.route("/login").post(validator.login, controller.login);
authRouter.route("/logout").get(allowTo("user"), controller.logout);
authRouter
  .route("/refresh")
  .get(verifyRefreshToken, validator.refresh, controller.refresh);
authRouter
  .route("/token")
  .get(verifyRefreshToken, validator.refresh, controller.refreshAccessToken);
