const User = require('../model/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.createUser = async (req, res) => {
  try {

    const { email } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Adresse email invalide.' });
    }

    console.log('Données de l\'utilisateur:', req.body);

    // Check if the password is provided
    if (!req.body.passwordHash) {
      return res.status(400).json({ message: 'Le mot de passe est requis.' });
    }



    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(req.body.passwordHash, saltRounds);
    const newUser = new User({
      ...req.body,
      passwordHash: hashedPassword, // Replace the plain password with the hashed one
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getAllUsers = async (res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};