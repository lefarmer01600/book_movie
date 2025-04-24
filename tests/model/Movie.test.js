const assert = require('assert');
const Movie = require('../../src/model/Movie');

(() => {
  console.log("Running tests for Movie model...");

  const movie = new Movie({
    title: "Test Movie",
    director: "Test Director",
    year: 2023
  });

  assert.strictEqual(movie.title, "Test Movie", "Movie title should match");
  assert.strictEqual(movie.director, "Test Director", "Movie director should match");

  console.log("All tests passed!");
})();