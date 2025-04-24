const express = require('express');
const router = express.Router();
const bookNoteController = require('../controllers/bookNoteController');

router.get('/', bookNoteController.getAllNotes);
router.post('/', bookNoteController.createNote);
router.get('/:id', bookNoteController.getNoteById);
router.put('/:id', bookNoteController.updateNote);
router.delete('/:id', bookNoteController.deleteNote);
router.get('/comments/:bookId', bookNoteController.getCommentsByBookId); 

module.exports = router;