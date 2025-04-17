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
    const note = new MovieNote(req.body);
    await note.save();
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