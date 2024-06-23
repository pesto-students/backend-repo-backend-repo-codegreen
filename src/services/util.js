import axios from "axios";

/** Below function is used to get the address from the latitude and longitude provided
 * @param latitude, longitude
 * @returns address in string format
 */
const getAddressFromLatitudeAndLongitude = async (latitude, longitude) => {
  try {
    if (!latitude || !longitude)
      throw new Error("latitude or longitude is missing.");
    const response = await axios.get(
      `${process.env.GOOGLE_MAPS_URL}?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );

    // Extract formatted address from response data
    const formattedAddress = response.data.results[0].formatted_address;

    return formattedAddress;
  } catch (error) {
    console.error(error?.message);
    throw new Error(error);
  }
};

export { getAddressFromLatitudeAndLongitude };
