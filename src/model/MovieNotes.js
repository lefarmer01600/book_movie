const mongoose = require("mongoose");

const movieNoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  scenario: { type: Number, required: true },
  acting: { type: Number, required: true },
  audioVisualQuality: { type: Number, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MovieNote", movieNoteSchema);