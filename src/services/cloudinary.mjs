/** @format */
import { v2 as cloudinary } from 'cloudinary';
// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dhjhkqarn',
  api_key: '634762432768818',
  api_secret: '1shpv1YcfkB29lVMGzeBToJSfR4',
});
export const ImageUpload = async (imagePath) => {
  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath);
    return result.secure_url;
  } catch (error) {
    throw new Error('error', { cause: error });
  }
};