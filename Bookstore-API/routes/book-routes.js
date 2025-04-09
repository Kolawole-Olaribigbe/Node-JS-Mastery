const express = require('express');
const {getAllBooks, getSingleBookById, updateBook, deleteBook, addNewBook } = require('../controllers/book-controller');

// Create express router
const router = express.Router();

//All routes related to books only
router.get('/get', getAllBooks);
router.get('/get/:id', getSingleBookById);
router.post('/add', addNewBook);
router.put('/update/:id', updateBook);
router.delete('/delete/:id', deleteBook);

module.exports = router;