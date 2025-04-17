const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Movie = require("./src/model/Movie");
const Book = require("./src/model/Book");
const bookRoutes = require('./src/routes/books');
const movieRoutes = require('./src/routes/movies');

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

app.use('/api/books', bookRoutes);
app.use('/api/movies', movieRoutes);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html', 'index.html'));
});

app.get('/adminpanel', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html', 'adminpanel.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});