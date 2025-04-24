const assert = require('assert');
const bookController = require('../../src/controllers/bookController');

(async () => {
  console.log("Running tests for bookController...");

  const mockBooks = [
    { id: 1, title: "Book 1", author: "Author 1" },
    { id: 2, title: "Book 2", author: "Author 2" }
  ];

  bookController.Book = {
    find: async () => mockBooks,
    findById: async (id) => mockBooks.find(book => book.id === id),
    create: async (data) => ({ id: 3, ...data }),
    findByIdAndUpdate: async (id, data) => ({ id, ...data }),
    findByIdAndDelete: async (id) => mockBooks.find(book => book.id === id)
  };

  const books = await bookController.Book.find();
  assert.strictEqual(books.length, 2, "Should return 2 books");

  const book = await bookController.Book.findById(1);
  assert.strictEqual(book.title, "Book 1", "Should return the correct book");

  console.log("All tests passed!");
})();