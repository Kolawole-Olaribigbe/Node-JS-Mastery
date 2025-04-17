const Image = require('../models/image');
const { uploadToCloudinary } = require('../helpers/cloudinaryHelper');
const { image } = require('../config/cloudinary');
const cloudinary = require('../config/cloudinary');

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
const fetchImageController = async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : - 1;
        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages / limit);

        const sortObj = {};
        sortObj[sortBy] = sortOrder
        const images = await Image.find().sort(sortObj).skip(skip).limit(limit);
        if (condition) {
            res.status(200).json({
                success: true,
                currentPage: page,
                totalPages: totalPages,
                totalImages: totalImages,
                data: images
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}
const deleteImageController = async(req, res)=>{
    try {
        const getCurrentIdOfImageToBeDeleted = req.params.id;
        const userId = req.userInfo.userId;
        const image = await Image.findById(getCurrentIdOfImageToBeDeleted);
    if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }
        //check if image is uploaded by current user trying to delete
        if (image.uploadedBy.toString) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this image'
            });
        }
        //delete image from cloudinary
        await cloudinary.uploader.destroy(image.publicId);
        //delete image from mongodb
        await Image.findByIdAndUpdate(getCurrentIdOfImageToBeDeleted);
        res.status(200).json({
            success: true,
            message: 'Image deleted successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}
module.exports = {
    uploadImageController,
    fetchImageController,
    deleteImageController
}