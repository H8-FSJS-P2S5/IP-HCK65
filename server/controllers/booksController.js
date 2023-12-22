const Axios = require("axios");

module.exports = class BooksController {
    static async getBooks(req, res, next) {
        const { q, startIndex = 0 } = req.query

        let query = q || 'programmer fullstack';

    
        let paramsQuery = {
            q: query,
            key: process.env.GOOGLE_API_KEY,
            startIndex: parseInt(startIndex, 10),
            maxResults: 20
        };

        try {
            const { data } = await Axios.get(`https://www.googleapis.com/books/v1/volumes`, { params: paramsQuery });
            res.status(200).json(data)
        } catch (error) {
            next(error);
        }
    }


    static async getBooksById(req, res, next){
        try {
            const {id} = req.params
            const {data} = await Axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.GOOGLE_API_KEY}`)
            res.status(200).json(data)
            // console.log(data);
        } catch (error) {
           next(error);
        }
    }

    // static async buyBook(req, res, next) {
    //     const userId = req.user.id
    //     const orderId = req.body.orderId
    //     try {
    //         const user = await User.findByPk(userId)
    //         if(!user) {
    //             throw {name : "Unauthorized", message : "You are not authorized to upgrade"}
    //         }
            
    
    //         if(user.role === 'admin') {
    //             return res.json({success : false, message : "Already admin"})
    //         }
    
    //         const order = await Order.findOne({
    //             where : {
    //                 orderId
    //             }
    //         })
    
    //         if(!order) {
    //             throw {name : 'Not Found', message : "No Transaction Found"}
    //         }
    
    //         // const token = Buffer.from("SB-Mid-server-PfxQnJUXtDA8RCzg8qKEtnK2").toString('base64')
    //         // console.log(token, '<<<< token')
    
    //         const url = `https://api.sandbox.midtrans.com/v2/${orderId}/status`
    //         const options = {
    //             method : 'GET',
    //             headers : {
    //                 accept : 'application/json',
    //                 authorization : "Basic " + "U0ItTWlkLXNlcnZlci1QZnhRbkpVWHREQThSQ3pnOHFLRXRuSzI6"
    //                 // authorization : "Basic U0ItTWlkLXNlcnZlci1QZnhRbkpVWHREQThSQ3pnOHFLRXRuSzI6"
    //             }
    //         }
    
    //         const { data } = await Axios.get(url, options)
    //         // console.log(data, '<< hacktivvvvv')
            
    //         if(data.transaction_status === 'capture' && +data.status_code === 200) {
    //             await order.update({
    //                 status : 'paid',
    //                 paidDate : new Date()
    //             })
    
    //             await user.update({
    //                 role : 'admin'
    //             })
        
    //             res.json({message : 'Upgrade account success'})
    //         } else {
    //             res.status(400).json({message : 'Transaction is not success'})
    //         }
    //     } catch (error) {
    //         if(error.name === 'Unauthorized') {
    //             res.status(401).json({message : error.message})
    //         } else if(error.name === 'NotFound') {
    //             res.status(404).json({message : error.message})
    //         } else {
    //             res.status(500).json({message : `Internal server error`})
    //         }
    //     }
    //    }
   
}