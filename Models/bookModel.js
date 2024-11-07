let books = [];

class Book {
  constructor(ISBN, title, description, keywords = []) {
    this.ISBN = ISBN;
    this.title = title;
    this.description = description;
    this.keywords = keywords;
  }
}

module.exports = { books, Book };
