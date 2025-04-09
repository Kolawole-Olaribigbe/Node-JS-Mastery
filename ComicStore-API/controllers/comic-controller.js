const Comic = require('../models/comic');

const getAllComics = async (req, res) => {
    try {
        const allComics = await Comic.find({});
        if (allComics?.length > 0) {
            res.status(200).json({
                success: true,
                message: 'List of comics',
                data: allComics
            });
        } else {
            res.status(404).json({
                message: 'No comics found'
            });
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Try again later'
        });
    }
}

const getSingleComicById = async (req, res) => {
    try {
        const getCurrentComicId = req.params.id;
        const comicDetailsById = await Comic.findById(getCurrentComicId);
        if (!comicDetailsById) {
            return res.status(404).json({
                success: false,
                message: 'Comic with ID not found'
            });
        }
        res.status(200).json({
            success: true,
            data: comicDetailsById
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Try again later'
        });
    }
}

const addNewComic = async (req, res) => {
    try {
        const newComicFormData = req.body;
        const newlyAddedComic = await Comic.create(newComicFormData);
        if (newComicFormData) {
            res.status(201).json({
                success: true,
                message: 'Comic added successfully',
                data: newlyAddedComic
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Try again later'
        });
    }
}

const updateComic = async (req, res) => {
    try {
        const updatedComicFormData = req.body;
        const getCurrentComicId = req.params.id;
        const updatedComic = await Comic.findByIdAndUpdate(getCurrentComicId, updatedComicFormData, {
            new: true
        });
        if (!updatedComic) {
            res.status(404).json({
                success: false,
                message: 'Comic with ID not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Comic updated successfully',
            data: updatedComic
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Try again later'
        });
    }
}

const deleteComic = async (req, res) => {
    try {
        const getCurrentComicId = req.params.id;
        const deletedComic = await Comic.findByIdAndDelete(getCurrentComicId);
        if (!deletedComic) {
            res.status(404).json({
                success: false,
                message: 'Comic with ID not found'
            });
        }
        res.status(200).json({
            success: true,
            data: deletedComic
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Try again later'
        })
    }
}
module.exports = {
    getAllComics, 
    getSingleComicById, 
    addNewComic, 
    updateComic, 
    deleteComic
}