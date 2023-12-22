const express = require("express")
const router = express.Router()
const books = require("./books")
const users = require("./users")
const readingLists = require("./readingList")


router.use("/books", books)
router.use("/users", users)
router.use("/reading-list", readingLists)

module.exports = router