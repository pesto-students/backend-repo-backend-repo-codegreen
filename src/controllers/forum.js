import {
  createNewForumPost,
  updateForumPostData,
  fetchAllForumPosts,
} from "../services/forum.js";

const createPost = async (req, res, next) => {
  try {
    const { id } = req?.token ?? {};
    const images = req?.files?.images;
    const details = JSON.parse(req?.body?.details);

    if (!id) {
      const error = new Error("Token is invalid or userId is invalid");
      error.status = 401;
      throw error;
    }

    if (!details || !Object.keys(details)?.length) {
      const error = new Error("Form Details are invalid");
      error.status = 400;
      throw error;
    }

    const createdForum = await createNewForumPost(id, details, images);
    return res.status(200).send(createdForum);
  } catch (error) {
    next({
      message: error?.message || "Internal server error",
      status: error.status || 500,
    });
  }
};

const updateForumPost = async (req, res, next) => {
  try {
    const { id } = req?.token ?? {};
    const updateData = req?.body ?? {};
    const { id: forumPostId } = req?.params;

    if (!forumPostId) {
      const error = new Error("Forum post id is invalid");
      error.status = 400;
      throw error;
    }

    if (!id) {
      const error = new Error("Token is invalid or userId is invalid");
      error.status = 401;
      throw error;
    }

    if (!updateData || !Object.keys(updateData)?.length) {
      const error = new Error("update data is invalid");
      error.status = 400;
      throw error;
    }

    const updatedPost = await updateForumPostData(id, updateData, forumPostId);

    return res.status(200).send(updatedPost);
  } catch (error) {
    next({
      message: error?.message || "Internal server error",
      status: error.status || 500,
    });
  }
};

const getForumPosts = async (req, res, next) => {
  try {
    const forumPosts = await fetchAllForumPosts();
    return res.status(200).send(forumPosts);
  } catch (error) {
    next({
      message: error?.message || "Internal server error",
      status: error.status || 500,
    });
  }
};
export { createPost, updateForumPost, getForumPosts };
