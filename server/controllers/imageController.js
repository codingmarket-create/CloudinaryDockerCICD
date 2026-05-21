const cloudinary = require("../config/cloudinary");
const Image = require("../models/Image");

const streamifier = require("streamifier");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "cloudinary-app",
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload();

    const image = await Image.create({
      title: req.body.title,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      uploadedBy: req.user._id,
    });

    res.status(201).json(image);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const getImages = async (req, res) => {
  try {
    const images = await Image.find().populate("uploadedBy", "name email");

    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadImage,
  getImages,
};
