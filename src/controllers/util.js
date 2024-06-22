import { getAddressFromLatitudeAndLongitude } from "../services/util.js";

const fetchAddressFromLatitudeAndLongitude = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.params ?? {};
    if (!latitude || !longitude) {
      const error = new Error("latitude or longitude is missing.");
      error.status = 400;
      throw error;
    }
    const address = await getAddressFromLatitudeAndLongitude(
      latitude,
      longitude
    );
    return res.status(200).send({ address });
  } catch (error) {
    next({
      message: error?.message || "Internal server error",
      status: error.status || 500,
    });
  }
};

export { fetchAddressFromLatitudeAndLongitude };
