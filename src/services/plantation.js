import { uploadImageToCloudinary } from "./cloudinary.js";
import Plantation from "../schema/plantation.js";
import mongoose from "mongoose";
import Milestones from "../schema/plantationMilestones.js";
import { fileURLToPath } from "url";
import path from "path";
import { promises as fsPromises } from "fs";
import { updateUser } from "../services/user.js";

/** Below function is used to create new Plantation
 * take image upload to cloudinary
 * take milestones calculate points
 * update in user collections for points
 * create new plantation
 * @param image , additional details, userId
 * @returns created Plantation
 */
const createPlantation = async (image, details, userId) => {
  try {
    if (!image || !details) {
      const error = new Error("Image or details of new plantation is missing");
      error.status = 400;
      throw error;
    }
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    /** UPLOAD TO CLOUDINARY */
    const imagePath = path.join(__dirname, "..", "images", image.name);
    await fsPromises.writeFile(imagePath, image.data);
    const getCloudinaryUrl = uploadImageToCloudinary(imagePath);

    /** CALCULATE POINTS BASED ON MILESTONES */
    const getPoints = getPointsForMilestones(details?.milestones);

    const [cloudinaryUrl, points] = await Promise.all([
      getCloudinaryUrl,
      getPoints,
    ]);

    /** FINALLY CREATE NEW PLANTATION */
    const newPlantation = new Plantation();
    newPlantation.treeName = details?.treeName;
    newPlantation.cloudinaryUrls = [cloudinaryUrl];
    newPlantation.milestones = details?.milestones;
    newPlantation.plantationDate = details?.date;
    newPlantation.createdBy = userId;
    newPlantation.points = points;
    newPlantation.location = details?.location;

    /** DELETE THE LOCAL FILE  */
    await fsPromises.unlink(imagePath);

    /** UPDATE IN USER COLLECTION FOR POINTS */
    await updateUser(userId, { $inc: { points: points } });

    return await newPlantation.save();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** Below function is used to calculate points from the milestones which user has selected
 * @param milestone which user has selected
 * @returns points
 */
const getPointsForMilestones = async (milestones) => {
  try {
    if (!milestones) {
      const error = new Error("Milestones is missing.");
      error.status = 500;
      throw error;
    }
    const DBmilestones = await getPlantationMilestones();
    return milestones?.reduce((previousValue, milestone) => {
      const currentDBmilestone = DBmilestones.find(
        (dbMilestone) => dbMilestone?._id?.toString() === milestone?.toString()
      );
      return previousValue + currentDBmilestone?.points;
    }, 0);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** below function is used to get te plantation milestones
 * @returns array of plantation milestones
 */
const getPlantationMilestones = async () => {
  try {
    return Milestones.find();
  } catch (error) {
    console.error(error?.message);
    throw new Error(error);
  }
};

/** Below function is used to get all Plantations which user has uploaded
 * @param userId
 * @returns array of plantations
 */
const getAllPlantations = async (userId) => {
  try {
    if (!userId) {
      const error = new Error("Internal server error");
      error.status = 500;
      throw error;
    }
    const filters = { createdBy: new mongoose.Types.ObjectId(userId) };

    return await Plantation.find(filters)
      .sort({ createdAt: -1 })
      .populate("milestones");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** Below function is used to update the  plantation of the user
 * @params id of plantation, image,details,userId
 * @returns updated plantation data
 */
const updateUserPlantation = async (id, image, details, userId) => {
  try {
    if (!image || !details || !id) {
      const error = new Error(
        "Image or details or id of new plantation is missing"
      );
      error.status = 400;
      throw error;
    }
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    /** UPLOAD TO CLOUDINARY */
    const imagePath = path.join(__dirname, "..", "images", image.name);
    await fsPromises.writeFile(imagePath, image.data);
    const getCloudinaryUrl = uploadImageToCloudinary(imagePath);

    /** CALCULATE POINTS BASED ON MILESTONES */
    const getPoints = getPointsForMilestones(details?.milestones);

    const [cloudinaryUrl, points] = await Promise.all([
      getCloudinaryUrl,
      getPoints,
    ]);

    /** UPDATE PLANTATION DATA*/
    const updatedData = await Plantation.findByIdAndUpdate(
      id,
      {
        treeName: details?.treeName,
        cloudinaryUrls: [cloudinaryUrl],
        milestones: details?.milestones,
        plantationDate: details?.date,
        points,
      },
      { new: true }
    );

    /** UPDATE POINTS IN USER COLLECTION */
    await updateUser(userId, { $inc: { points } });

    /** DELETE THE LOCAL FILE  */
    await fsPromises.unlink(imagePath);
    return updatedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  getPlantationMilestones,
  createPlantation,
  getAllPlantations,
  updateUserPlantation,
};
