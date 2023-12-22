const express = require("express")
const BooksController = require("../controllers/booksController")
const books = express.Router()

books.get("/", BooksController.getBooks)
books.get("/:id", BooksController.getBooksById)

module.exports = books