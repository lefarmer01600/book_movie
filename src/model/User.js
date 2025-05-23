const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, // Nouveau champ pour les administrateurs
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);