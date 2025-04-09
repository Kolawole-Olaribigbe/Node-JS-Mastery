const express = require('express');
const {getAllComics, getSingleComicById, updateComic, deleteComic, addNewComic } = require('../controllers/comic-controller');

// Create express router
const router = express.Router();

//All routes related to books only
router.get('/get', getAllComics);
router.get('/get/:id', getSingleComicById);
router.post('/add', addNewComic);
router.put('/update/:id', updateComic);
router.delete('/delete/:id', deleteComic);

module.exports = router;