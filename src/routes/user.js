import express from "express";
const userRouter = express.Router();
import {
  validateSignupFields,
  validateSignInFields,
} from "../middlewares/user.js";
import { handleUserSignUp, handleUserLogin } from "../controllers/user.js";

userRouter.post("/signUp", [validateSignupFields, handleUserSignUp]);
userRouter.post("/signIn", [validateSignInFields, handleUserLogin]);

export default userRouter;
