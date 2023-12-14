'use strict';
const {
    Model
} = require('sequelize');
const {generatePassword} = require("../helpers");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Transaction, {
                foreignKey: "user_id"
            })

        }
    }

    User.init({
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Full Name is required"
                },
                notEmpty: {
                    msg: "Full Name is required"
                },
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Email must be unique"
            },
            validate: {
                isEmail: {
                    msg: "Invalid email format"
                },
                notNull: {
                    msg: "Email is required"
                },
                notEmpty: {
                    msg: "Email is required"
                },
            }
        },
        password: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.STRING,
        },

        balance: {
            type: DataTypes.INTEGER
        },
    }, {
        sequelize,
        modelName: 'User',
    });

    User.beforeCreate(async (user, options) => {
        if (user.password) {
            user.password = generatePassword(user.password)
        }
    });

    return User;
};