const http = require('http');
const assert = require('assert');

(async () => {
  console.log("Running integration tests for movies...");

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/movies',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const newMovie = JSON.stringify({
    title: "Integration Test Movie",
    actors: ["Actor 1", "Actor 2"],
    director: "Test Director",
    category: "Test Category",
  });

  const request = new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.write(newMovie);
    req.end();
  });

  const response = await request;
  assert.strictEqual(response.title, "Integration Test Movie", "Movie title should match");
  console.log("Integration test passed!");
})();