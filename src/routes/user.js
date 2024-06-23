import express from "express";
const userRouter = express.Router();
import {
  validateSignupFields,
  validateSignInFields,
} from "../middlewares/user.js";
import {
  handleUserSignUp,
  handleUserLogin,
  editUser,
} from "../controllers/user.js";

userRouter.post("/signUp", [validateSignupFields, handleUserSignUp]);
userRouter.post("/signIn", [validateSignInFields, handleUserLogin]);
userRouter.patch("/editUser", editUser);

export default userRouter;
