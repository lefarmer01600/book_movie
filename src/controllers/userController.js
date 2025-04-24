const User = require('../model/User');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const mongoose = require('mongoose');

exports.createUser = async (req, res) => {
  try {
    const { name, email, passwordHash, isAdmin } = req.body;

    // Validation des champs requis
    if (!name || !email || !passwordHash) {
            return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Validation du format de l'email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Adresse email invalide.' });
    }

    // Création de l'utilisateur
    const hashedPassword = await bcryptjs.hash(req.body.passwordHash, saltRounds);
    const newUser = new User({
        name,
        email,
        passwordHash: hashedPassword,
        isAdmin: isAdmin || false // Défaut : non-admin
    });
    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (error) {
    console.error("Erreur serveur:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    // Stocker l'utilisateur dans la session
    req.session.user = { id: user._id, email: user.email, isAdmin: user.isAdmin, username: user.name };

    res.status(200).json({ message: "Connexion réussie." });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

exports.getAllUsers = async (res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getUserById = async (req, res) => {
  try {

    const userId = req.params.id.trim().replace(/^:/, ''); // Nettoie l'ID

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "ID utilisateur invalide." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    res.json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};