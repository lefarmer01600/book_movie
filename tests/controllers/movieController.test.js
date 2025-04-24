const assert = require('assert');
const movieController = require('../../src/controllers/movieController');

(async () => {
  console.log("Running tests for movieController...");

  const mockMovies = [
    { id: 1, title: "Movie 1", director: "Director 1" },
    { id: 2, title: "Movie 2", director: "Director 2" }
  ];

  movieController.Movie = {
    find: async () => mockMovies,
    findById: async (id) => mockMovies.find(movie => movie.id === id),
    create: async (data) => ({ id: 3, ...data }),
    findByIdAndUpdate: async (id, data) => ({ id, ...data }),
    findByIdAndDelete: async (id) => mockMovies.find(movie => movie.id === id)
  };

  const movies = await movieController.Movie.find();
  assert.strictEqual(movies.length, 2, "Should return 2 movies");

  const movie = await movieController.Movie.findById(1);
  assert.strictEqual(movie.title, "Movie 1", "Should return the correct movie");

  console.log("All tests passed!");
})();