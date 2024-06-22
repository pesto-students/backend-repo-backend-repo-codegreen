import { v2 as cloudinary } from "cloudinary";

/** Below function is used to upload image into cloudinary and get the url after upload
 * @param filePath
 * @returns url of the uploaded cloudinary image
 */
const uploadImageToCloudinary = async (filePath) => {
  try {
    if (!filePath) throw new Error("file path is missing.");
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    if (uploadResult) return uploadResult.url;
  } catch (error) {
    console.error(error);
    throw new Error(error?.message);
  }
};

export { uploadImageToCloudinary };
