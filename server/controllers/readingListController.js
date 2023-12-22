const {ReadingList} = require('../models')

module.exports = class ReadingListController {
    static async addReadingList(req, res, next) {
        try {
            // console.log(req.body);
            await ReadingList.create({ BookId : req.body.id, title : req.body.volumeInfo.title, author : req.body.volumeInfo.authors[0] , publisher : req.body.volumeInfo.publisher, publisherDate :req.body.volumeInfo.publishedDate, pages : req.body.volumeInfo.pageCount,  imageUrl : req.body.volumeInfo.imageLinks.thumbnail, linkReading : req.body.accessInfo.webReaderLink, UserId : req.user.id})
            res.status(201).json({message : 'Success add book to your reading list'})
        } catch (error) {
            next(error)
        }
    }

    static async getReadingListById(req, res, next){
        try {
            const readingList = await ReadingList.findAll({
                where: {
                    UserId: req.user.id
                }
            })
            res.status(200).json(readingList )
        } catch (error) {
            next(error)
        }
    }

    
    static async deleteReadingList(req, res, next) {
        try {
            const { id } = req.params
            const book = await ReadingList.findByPk(id)
            if (!book) throw { name: 'NotFound' }
            await book.destroy()
            res.status(200).json({
                message: `Book with title ${book.title} success deleted`
            })
        } catch (error) {
            next(error)
        }
    }

   
}