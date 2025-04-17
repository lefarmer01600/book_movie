const MovieNote = require('../model/MovieNotes');

exports.getAllNotes = async (req, res) => {
    try {
        const notes = await MovieNote.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getNoteById = async (req, res) => {
    try {
        const note = await MovieNote.findById(req.params.id);
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createNote = async (req, res) => {
    try {
        // Créer un nouvel objet MovieNote
        const note = new MovieNote(req.body);

        // Sauvegarder la note
        await note.save();

        // Récupérer le film associé à la note
        const movie = await Movie.findById(req.body.movieId);
        if (!movie) return res.status(404).json({ error: 'Movie not found' });

        // Calculer la nouvelle moyenne
        const newNote = (req.body.scenario + req.body.acting + req.body.audioVisualQuality) / 3;
        const totalRatings = movie.totalRatings + 1;
        let newAverageRating = ((movie.averageRating * (totalRatings - 1)) + newNote) / totalRatings;

        // Limiter la moyenne à 5
        if (newAverageRating > 5) {
            newAverageRating = 5;
        }

        // Mettre à jour le film avec la nouvelle moyenne et le nombre total de notes
        movie.averageRating = newAverageRating;
        movie.totalRatings = totalRatings;

        await movie.save();

        res.status(201).json(note);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const note = await MovieNote.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json(note);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const note = await MovieNote.findByIdAndDelete(req.params.id);
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};