import User from "../schema/user.js";
import mongoose from "mongoose";

/** Below function is responsible to get the single user from DB
 * @param search criteria
 * @returns user Details if present else null;
 */
const getSingleUser = async (filters) => {
  try {
    if (!filters || !Object.keys(filters)?.length) {
      const error = new Error(
        "Please provide the filter criteria for searching the user"
      );
      error.status = 500;
      throw error;
    }

    const user = await User?.findOne(filters);

    return user;
  } catch (error) {
    console.error(error?.message);
    throw error;
  }
};

/** Below function is responsible for creating new User
 * @param  userData to create
 * @returns created user
 */
const createNewUser = async (userData) => {
  try {
    if (!userData || !Object.keys(userData)?.length) {
      const error = new Error(
        "Data for creating the new user is invalid please provide appropriate user data to create the new user."
      );
      error.status = 400;
      throw error;
    }

    // create new user;
    const newUser = new User({
      ...userData,
      lastName: userData?.lastName ? userData?.lastName : "",
    });

    return await newUser.save();
  } catch (error) {
    console.error(error?.message);
    throw error;
  }
};

const updateUser = async (userId, updateData) => {
  try {
    if (!userId) {
      const error = new Error("userId is invalid");
      error.status = 500;
      throw error;
    }

    if (!updateData || !Object.keys(updateData)?.length) {
      const error = new Error("user Update data is invalid.");
      error.status = 500;
      throw error;
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId) },
      updateData,
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    console.error(error?.message);
    throw error;
  }
};

export { getSingleUser, createNewUser, updateUser };
