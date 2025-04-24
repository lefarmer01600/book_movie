const assert = require('assert');
const Book = require('../../src/model/Book');

(() => {
  console.log("Running tests for Book model...");

  const book = new Book({
    title: "Test Book",
    author: "Test Author",
    publisher: "Test Publisher",
    category: "Test Category"
  });

  assert.strictEqual(book.title, "Test Book", "Book title should match");
  assert.strictEqual(book.author, "Test Author", "Book author should match");

  console.log("All tests passed!");
})();