const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Task 1 & 10: Get all books
public_users.get('/', function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Task 2 & 11: Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.send(books[isbn]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Task 3 & 12: Get book details based on Author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  let matchingBooks = {};
  Object.keys(books).forEach((key) => {
    if (books[key].author.toLowerCase() === author.toLowerCase()) {
      matchingBooks[key] = books[key];
    }
  });
  res.send(JSON.stringify(matchingBooks, null, 4));
});

// Task 4 & 13: Get book details based on Title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  let matchingBooks = {};
  Object.keys(books).forEach((key) => {
    if (books[key].title.toLowerCase() === title.toLowerCase()) {
      matchingBooks[key] = books[key];
    }
  });
  res.send(JSON.stringify(matchingBooks, null, 4));
});

// Task 5: Get book reviews
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.send(books[isbn].reviews);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
