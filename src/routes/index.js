import express from "express";
import userRouter from "./user.js";
import utilRouter from "./util.js";
import plantationRouter from "./plantation.js";
import forumRouter from "./forum.js";

const mainRouter = express.Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/utils", utilRouter);
mainRouter.use("/plantation", plantationRouter);
mainRouter.use("/forum", forumRouter);

export default mainRouter;
