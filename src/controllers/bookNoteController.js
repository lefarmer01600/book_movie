const BookNote = require('../model/BookNotes');
const Book = require('../model/book');

exports.getAllNotes = async (req, res) => {
    try {
        const notes = await BookNote.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getNoteById = async (req, res) => {
    try {
        const note = await BookNote.findById(req.params.id);
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createNote = async (req, res) => {
    try {
        // Créer un nouvel objet BookNote
        const note = new BookNote(req.body);

        // Sauvegarder la note
        await note.save();

        // Récupérer le livre associé à la note
        const book = await Book.findById(req.body.bookId);
        if (!book) return res.status(404).json({ error: 'Book not found' });

        // Calculer la nouvelle moyenne
        const newNote = (req.body.scenario + req.body.characters + req.body.writingQuality) / 3;
        const totalRatings = book.totalRatings + 1;
        let newAverageRating = ((book.averageRating * (totalRatings - 1)) + newNote) / totalRatings;

        // Limiter la moyenne à 5
        if (newAverageRating > 5) {
            newAverageRating = 5;
        }

        // Mettre à jour le livre avec la nouvelle moyenne et le nombre total de notes
        book.averageRating = newAverageRating;
        book.totalRatings = totalRatings;

        await book.save();

        res.status(201).json(note);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const note = await BookNote.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json(note);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const note = await BookNote.findByIdAndDelete(req.params.id);
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};