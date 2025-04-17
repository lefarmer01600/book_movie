const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route pour créer un utilisateur
router.post('/', userController.createUser);

// Route pour récupérer tous les utilisateurs
router.get('/', userController.getAllUsers);

module.exports = router;