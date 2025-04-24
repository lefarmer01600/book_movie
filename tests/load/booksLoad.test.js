const http = require('http');

(async () => {
  console.log("Running load tests for books...");

  const requests = [];
  const totalRequests = 50; // Nombre de requêtes à envoyer
  const url = 'http://localhost:3000/api/books';

  for (let i = 0; i < totalRequests; i++) {
    requests.push(
      new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          res.on('data', () => {}); // Consomme les données
          res.on('end', resolve);
        });
        req.on('error', reject);
      })
    );
  }

  try {
    const startTime = Date.now();
    await Promise.all(requests);
    const endTime = Date.now();
    console.log(`Completed ${totalRequests} requests in ${endTime - startTime}ms`);
  } catch (error) {
    console.error("Error during load test:", error);
  }
})();