const express = require('express');
const router = express.Router();
const movieNoteController = require('../controllers/movieNoteController');


router.get('/', movieNoteController.getAllNotes);
router.post('/', movieNoteController.createNote);
router.get('/:id', movieNoteController.getNoteById);
router.put('/:id', movieNoteController.updateNote);
router.delete('/:id', movieNoteController.deleteNote);
router.get('/comments/:movieId', movieNoteController.getCommentsByMovieId); 

module.exports = router;