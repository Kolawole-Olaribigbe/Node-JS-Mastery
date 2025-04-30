const Author = require('../models/Author');
const Book = require('../models/Books');

const createAuthor = async(req, res)=>{
    try {
        const author = await Author(req.body);
        await author.save()
        res.status(201).json({
            success: true,
            data: author
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success : false,
            message: 'An error occurred'
        });
    }
} 

const createBook = async(req, res)=>{
    try {
        const book = await Author(req.body);
        await book.save()
        res.status(201).json({
            success: true,
            data: book
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success : false,
            message: 'An error occurred'
        });
    }
} 

const getBookWithAuthor = async(req, res)=>{
    try {
        const book = await Book.findById(req.params.id).populate('author');
        if(!book){
            return res.status(404).json({
                success: 'false',
                message: 'Book not found!'
            });
        }
        res.status(200).json({
            success: true,
            data: book
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success : false,
            message: 'An error occurred'
        });
    }
}
module.exports = {createAuthor, createBook, getBookWithAuthor}