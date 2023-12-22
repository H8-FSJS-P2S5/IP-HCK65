const express = require("express")
const ReadingListController = require("../controllers/readingListController")
const { authentication } = require("../midlewares/authentication")
const readingList = express.Router()

readingList.use(authentication)
readingList.post('/', ReadingListController.addReadingList)
readingList.get('/', ReadingListController.getReadingListById)
readingList.delete('/:id', ReadingListController.deleteReadingList)


module.exports = readingList