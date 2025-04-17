const User = require('../model/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.createUser = async (req, res) => {
    try {
        const { name, email, passwordHash } = req.body;

        // Validation des champs requis
        if (!name || !email || !passwordHash) {
            return res.status(400).json({ message: 'Tous les champs sont requis.' });
        }

        // Validation du format de l'email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Adresse email invalide.' });
        }

        // Création de l'utilisateur (exemple)
        const newUser = { name, email, passwordHash }; // Remplacez par votre logique de sauvegarde
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erreur serveur:', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, passwordHash } = req.body;

        console.log('Email reçu:', email);
        console.log('Mot de passe haché reçu:', passwordHash);

        const user = await User.findOne({ email });
        if (!user) {
            console.log('Utilisateur non trouvé.');
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        console.log('Utilisateur trouvé:', user);

        // Comparer le mot de passe haché
        const isPasswordValid = await bcrypt.compare(passwordHash, user.passwordHash);
        if (!isPasswordValid) {
            console.log('Mot de passe incorrect.');
            return res.status(401).json({ message: 'Mot de passe incorrect.' });
        }

        console.log('Connexion réussie pour l\'utilisateur:', user.email);
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