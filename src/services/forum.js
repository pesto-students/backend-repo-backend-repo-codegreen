import Forum from "../schema/forum.js";
import moment from "moment";
import { fileURLToPath } from "url";
import path from "path";
import { promises as fsPromises } from "fs";
import { uploadImageToCloudinary } from "./cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Below function is used to create the new forum post
 * @param userId, forum Details
 * @returns createdForum Details
 */
const createNewForumPost = async (userId, forumDetails, images) => {
  try {
    if (!userId || !forumDetails) {
      const error = new Error("Forum Details or userId is invalid");
      error.status = 500;
      throw error;
    }

    let cloudinaryUrls;
    /** If user is uploading images then upload it to cloudinary and then store the cloudinary urls*/
    if (images && images?.length) {
      const addFilesToLocalDiskPromises = [];
      const imagePaths = [];
      /** add images to local disk */
      images?.forEach((image) => {
        const imagePath = path.join(__dirname, "..", "images", image.name);
        imagePaths?.push(imagePath);
        addFilesToLocalDiskPromises.push(
          fsPromises.writeFile(imagePath, image.data)
        );
      });
      await Promise.all(addFilesToLocalDiskPromises);

      /** upload to cloudinary */
      const uploadToCloudinaryPromise = [];
      imagePaths?.forEach((imagePath) =>
        uploadToCloudinaryPromise.push(uploadImageToCloudinary(imagePath))
      );

      cloudinaryUrls = await Promise.all(uploadToCloudinaryPromise);
    }
    const newForumPost = new Forum();
    (newForumPost.title = forumDetails?.title),
      (newForumPost.description = forumDetails?.description),
      (newForumPost.author = forumDetails?.author),
      (newForumPost.date = forumDetails?.date),
      (newForumPost.comments = forumDetails?.comments
        ? forumDetails?.comments
        : []),
      (newForumPost.imageUrls = cloudinaryUrls ? cloudinaryUrls : []),
      (newForumPost.createdBy = userId);
    newForumPost.date = moment().utc();

    /** DELETE THE LOCAL FILES  */
    imagePaths?.forEach((imagePath) => fsPromises.unlink(imagePath));

    const createdForumPost = await newForumPost.save();
    return createdForumPost;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** Below function is used to update the forum post
 * @param userId, updateData, forumPostId
 * @returns Updated Form Data
 */
const updateForumPostData = async (userId, updateData, forumPostId) => {
  try {
    if (
      !userId ||
      !updateData ||
      !Object.keys(updateData).length ||
      !forumPostId
    ) {
      const error = new Error(
        "Id is invalid or update details are invalid or forum post id is invalid"
      );
      error.status = 500;
      throw error;
    }

    /** If user is updating comments then fetch the already present comments in DB and then attach the new comments to it */
    let commentsToUpdate = [];
    if (updateData?.comments) {
      const forumPostInDB = await Forum.findById(forumPostId);
      commentsToUpdate = [...forumPostInDB?.comments, ...updateData?.comments];
      updateData.comments = commentsToUpdate;
    }

    const updatedComments = await Forum?.findByIdAndUpdate(
      forumPostId,
      updateData,
      { new: true }
    ).populate("comments.author");
    return updatedComments;
  } catch (error) {
    throw error;
  }
};

const fetchAllForumPosts = async () => {
  try {
    const forums = await Forum.find().populate("author comments.author");
    return forums;
  } catch (error) {
    throw error;
  }
};
export { createNewForumPost, updateForumPostData, fetchAllForumPosts };
