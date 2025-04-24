const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Movie = require("./src/model/Movie");
const Book = require("./src/model/Book");
const bookRoutes = require('./src/routes/books');
const movieRoutes = require('./src/routes/movies');
const bookNoteRoutes = require('./src/routes/bookNotes');
const movieNoteRoutes = require('./src/routes/movieNotes');
const userRoutes = require('./src/routes/users');

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/book_movies';

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Export the mongoose connection to use in other files
module.exports = mongoose.connection;

app.use(express.json());

// Configuration de la session
app.use(session({
  secret: 'votre_secret',
  resave: false,
  saveUninitialized: false, // Changez à `false` pour éviter de créer des sessions inutiles
  cookie: { secure: false } // Mettez `true` si vous utilisez HTTPS
}));

// Middleware pour vérifier si l'utilisateur est connecté
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/connexion'); // Redirige vers la page de connexion si non connecté
}

// Middleware pour vérifier si l'utilisateur est administrateur
function isAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.isAdmin) {
    return next();
  }
  res.status(403).send("Accès refusé : vous n'êtes pas administrateur.");
}

app.use('/api/books', bookRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/book-notes', bookNoteRoutes);
app.use('/api/movie-notes', movieNoteRoutes);
app.use('/api/users', userRoutes);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html', 'index.html'));
});

// Route protégée pour le panneau admin
app.get('/adminpanel', isAuthenticated, isAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html', 'adminpanel.html'));
});

app.get('/inscription', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html', 'inscription.html'));
});

app.get('/connexion', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html', 'connexion.html'));
});

app.post('/api/users/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de la déconnexion." });
    }
    res.status(200).json({ message: "Déconnexion réussie." });
  });
});

app.get('/api/users/login', (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).json({ loggedIn: true, user: req.session.user });
  } else {
    res.status(401).json({ loggedIn: false });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});