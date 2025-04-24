const assert = require('assert');

(() => {
  console.log("Running tests for books routes...");

  const mockRequest = { params: { id: 1 } };
  const mockResponse = {
    json: (data) => data,
    status: function (code) {
      this.statusCode = code;
      return this;
    },
    end: () => {}
  };

  const bookController = require('../../src/controllers/bookController');
  bookController.Book = {
    findById: async (id) => ({ id, title: "Mock Book" })
  };

  const book = bookController.getBookById(mockRequest, mockResponse);
  assert.ok(book, "Should return a book");

  console.log("All tests passed!");
})();