const mongoose = require("mongoose");

const bookNoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  scenario: { type: Number, required: true },
  characters: { type: Number, required: true },
  writingQuality: { type: Number, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("BookNote", bookNoteSchema);