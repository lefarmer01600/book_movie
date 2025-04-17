const User = require('../model/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.createUser = async (req, res) => {
  try {

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

exports.loginUser = async (req, res) => {
    try {
        const { email, passwordHash } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        const isPasswordValid = await bcrypt.compare(passwordHash, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect.' });
        }

        res.status(200).json({ message: 'Connexion réussie.' });
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ message: 'Erreur serveur.' });
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