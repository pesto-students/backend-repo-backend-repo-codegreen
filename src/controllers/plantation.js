import {
  getPlantationMilestones,
  createPlantation,
  getAllPlantations,
  updateUserPlantation,
} from "../services/plantation.js";

const createNewPlantation = async (req, res, next) => {
  try {
    if (!req?.token) {
      const error = new Error("token is invalid");
      error.status = 401;
      throw error;
    }
    const image = req?.files?.image;
    const details = JSON.parse(req?.body?.details);
    if (!image || !details) {
      const error = new Error(
        "Image or details of the plantation is not provided."
      );
      error.status = 400;
      throw error;
    }
    const createdPlantation = await createPlantation(
      image,
      details,
      req?.token?.id
    );
    return res.status(200).send(createdPlantation);
  } catch (error) {
    next({
      message: error?.message || "Internal server error",
      status: error.status || 500,
    });
  }
};

const fetchPlantationMilestones = async (req, res, next) => {
  try {
    const plantationMilestones = await getPlantationMilestones();
    return res.status(200).send(plantationMilestones);
  } catch (error) {
    next({
      message: error?.message || "Internal server error",
      status: error.status || 500,
    });
  }
};

const fetchAllPlantations = async (req, res, next) => {
  try {
    if (!req?.token) {
      const error = new Error("token is invalid");
      error.status = 401;
      throw error;
    }
    const plantations = await getAllPlantations(req?.token?.id);
    return res.status(200).send(plantations);
  } catch (error) {
    next({
      message: error?.message || "Internal server error",
      status: error.status || 500,
    });
  }
};

const updatePlantation = async (req, res, next) => {
  try {
    const { id } = req?.params ?? {};
    if (!req?.token) {
      const error = new Error("token is invalid");
      error.status = 401;
      throw error;
    }

    if (!id) {
      const error = new Error("Plantation id is invalid.");
      error.status = 400;
      throw error;
    }

    const image = req?.files?.image;
    const details = JSON.parse(req?.body?.details);
    if (!image || !details) {
      const error = new Error(
        "Image or details of the plantation is not provided."
      );
      error.status = 400;
      throw error;
    }
    const updatedPlantation = await updateUserPlantation(
      id,
      image,
      details,
      req?.token?.id
    );
    return res.status(200).send(updatedPlantation);
  } catch (error) {
    next({
      message: error?.message || "Internal server error",
      status: error.status || 500,
    });
  }
};

export {
  createNewPlantation,
  fetchPlantationMilestones,
  fetchAllPlantations,
  updatePlantation,
};
