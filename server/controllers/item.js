const formatter = require('../helpers/formatRupiah');
const { Item, Cart } = require('../models')

class ItemController {
    static async fetchData(req, res, next) {
        try {
            let item = await Item.findAll();
            console.log(item);

            res.status(200).json(item)
        } catch (error) {
            next(error)
        }
    }

    static async addToCart(req, res, next) {
        try {
            const {id} = req.params

            let findData = await Item.findByPk(id)
            
            if (!findData) throw {name: "NotFound"}
            // console.log(findData.dataValues, "????????");
            let found = findData.dataValues
            // console.log(found, "FOUUUNNNDD");
            
            let newCart = await Cart.create({name: found.name, price: found.price})

            res.status(201).json(newCart)
        } catch (error) {
            next(error)
        }
    }

    static async readCart(req, res, next) {
        try {
            let cart = await Cart.findAll()

            res.status(200).json(cart)
        } catch (error) {
            next()
        }
    }

    static async deleteCart(req, res, next) {
        try {
            const {id} = req.params;

            let del = await Cart.destroy({where: {id}})

            if (!del) {
                throw {name: "NotFound"}
            }

            res.status(200).json({message: "Success delete item"})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ItemController;