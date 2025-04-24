const { exec } = require('child_process');
const mongoose = require('mongoose');

(async () => {
  console.log("Running TNR tests...");

  const runTest = (filePath) =>
    new Promise((resolve, reject) => {
      exec(`node ${filePath}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error in ${filePath}:\n`, stderr);
          reject(error);
        } else {
          console.log(`Output from ${filePath}:\n`, stdout);
          resolve();
        }
      });
    });

  try {
    // Génération d'un ObjectId valide pour les tests
    const validObjectId = new mongoose.Types.ObjectId(); // Correction ici

    // Passez l'ObjectId valide aux tests si nécessaire
    process.env.TEST_OBJECT_ID = validObjectId.toString();

    await runTest('./tests/routes/movies.test.js');
    await runTest('./tests/integration/moviesIntegration.test.js');
    await runTest('./tests/load/moviesLoad.test.js');
    await runTest('./tests/routes/books.test.js');
    await runTest('./tests/integration/booksIntegration.test.js');
    await runTest('./tests/load/booksLoad.test.js');
    console.log("All TNR tests passed!");
  } catch (error) {
    console.error("TNR tests failed:", error);
  }
})();