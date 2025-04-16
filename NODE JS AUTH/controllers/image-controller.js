const Image = require('../models/image');
const { uploadToCloudinary } = require('../helpers/cloudinaryHelper');
const { image } = require('../config/cloudinary');

const uploadImageController = async(req, res) => {
    try {
        //check if file is missing in request object
        if (!req.file) {
            return res.status(400).json({
                success : false,
                message : 'File is required. Please upload an image'
            });
        }
        //upload to cloudinary
        const {url, publicId} = await uploadToCloudinary(req.file.path);

        //store the image url and public id along with uploaded user id
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        });
        await newlyUploadedImage.save();
        res.status(201).json({
            success : true,
            message : 'Image uploaded successfully',
            image : newlyUploadedImage
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}
const fetchImageController = async(req, res)
module.exports = {
    uploadImageController,
}