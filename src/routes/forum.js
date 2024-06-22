import express from "express";
import {
  createPost,
  updateForumPost,
  getForumPosts,
} from "../controllers/forum.js";
const forumRouter = express.Router();

forumRouter.post("/create", createPost);
forumRouter.patch("/:id", updateForumPost);
forumRouter.get("/", getForumPosts);
export default forumRouter;
