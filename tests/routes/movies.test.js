const assert = require('assert');
const mongoose = require('mongoose'); // Import pour générer un ObjectId

(() => {
  console.log("Running tests for movies routes...");

  const validObjectId = new mongoose.Types.ObjectId(); // Génère un ObjectId valide

  const mockRequest = { params: { id: validObjectId.toString() } }; // Utilise l'ObjectId valide
  const mockResponse = {
    json: (data) => data,
    status: function (code) {
      this.statusCode = code;
      return this;
    },
    end: () => {}
  };

  const movieController = require('../../src/controllers/movieController');
  movieController.Movie = {
    findById: async (id) => ({ id, title: "Mock Movie" })
  };

  const movie = movieController.getMovieById(mockRequest, mockResponse);
  assert.ok(movie, "Should return a movie");

  console.log("All tests passed!");
})();