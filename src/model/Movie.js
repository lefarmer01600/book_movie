const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  actors: [{ type: String, required: true }],
  director: { type: String, required: true },
  category: { type: String, required: true },
  averageRating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  comments: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Movie", movieSchema);