const formatter = require('../helpers/formatRupiah');
const { Item, Cart } = require('../models')

class ItemController {
    static async fetchData(req, res) {
        try {
            let item = await Item.findAll();
            console.log(item);

            res.status(200).json(item)
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal server error"})
        }
    }

    static async addToCart(req, res) {
        try {
            const {id} = req.params

            let findData = await Item.findByPk(id)
            // console.log(findData.dataValues, "????????");
            let found = findData.dataValues
            // console.log(found, "FOUUUNNNDD");
            
            let newCart = await Cart.create({name: found.name, price: found.price})

            res.status(201).json(newCart)
        } catch (error) {
            res.status(500).json({message: "Internal server error"})
        }
    }

    static async readCart(req, res) {
        try {
            let cart = await Cart.findAll()

            res.status(200).json(cart)
        } catch (error) {
            res.status(500).json({message: "Internal server error"})
        }
    }

    static async deleteCart(req, res) {
        try {
            const {id} = req.params;

            let del = await Cart.destroy({where: {id}})

            if (!del) {
                throw {name: "NotFound"}
            }

            res.status(200).json({message: "Success delete item"})
        } catch (error) {
            if (error.name === "NotFound") {
                return res.status(404).json({message: "Data not found"})
            }
            res.status(500).json({message: "Internal server error"})
        }
    }
}

module.exports = ItemController;