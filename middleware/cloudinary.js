const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { unlink } = require("fs").promises;

class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadSingleImage(localFilePath) {
    const mainFolderName = "main";
    const filePathOnCloudinary = `${mainFolderName}/${localFilePath.replace(
      /\\/g,
      "/",
    )}`;

    try {
      const result = await cloudinary.uploader.upload(localFilePath, {
        public_id: filePathOnCloudinary,
      });
      await this.deleteLocalFile(localFilePath);
      return { message: "Success", url: result.secure_url, result };
    } catch (error) {
      console.error(`Error uploading single image to Cloudinary: ${error}`);
      throw error;
    }
  }

  async uploadMultipleImages(imagePaths) {
    try {
      return await Promise.all(
        imagePaths.map(async (imagePath) => {
          const mainFolderName = "main";
          const filePathOnCloudinary = `${mainFolderName}/${imagePath.replace(
            /\\/g,
            "/",
          )}`;

          const result = await cloudinary.uploader.upload(imagePath, {
            public_id: filePathOnCloudinary,
          });
          return result;
        }),
      );
    } catch (error) {
      console.error(`Error uploading multiple images to Cloudinary: ${error}`);
      throw error;
    }
  }

  async destroyImages(imagePublicIds) {
    try {
      await cloudinary.api.delete_resources(imagePublicIds);
    } catch (error) {
      console.error(`Error destroying images: ${error}`);
      throw error;
    }
  }

  async deleteSingleImage(imagePublicId) {
    try {
      const result = await cloudinary.uploader.destroy(imagePublicId);

      if (result.result === "ok") {
        console.log(`Image deleted successfully: ${imagePublicId}`);
      } else {
        console.error(`Error deleting single image: ${result.result}`);
        throw new Error(`Failed to delete image: ${result.result}`);
      }
    } catch (error) {
      console.error(`Error deleting single image: ${error}`);
      throw error;
    }
  }

  async deleteLocalFile(filePath) {
    try {
      await unlink(filePath);
      console.log(`Local file deleted successfully: ${filePath}`);
    } catch (unlinkError) {
      console.error(`Error deleting local file: ${unlinkError}`);
    }
  }
}

module.exports = new CloudinaryService();
