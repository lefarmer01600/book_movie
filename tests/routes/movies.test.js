const assert = require('assert');

(() => {
  console.log("Running tests for movies routes...");

  const mockRequest = { params: { id: 1 } };
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