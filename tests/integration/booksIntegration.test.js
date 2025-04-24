const http = require('http');
const assert = require('assert');

(async () => {
  console.log("Running integration tests for books...");

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/books',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const newBook = JSON.stringify({
    title: "Integration Test Book",
    author: "Test Author",
    publisher: "Test Publisher",
    category: "Test Category",
  });

  const request = new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.write(newBook);
    req.end();
  });

  const response = await request;
  assert.strictEqual(response.title, "Integration Test Book", "Book title should match");
  console.log("Integration test passed!");
})();