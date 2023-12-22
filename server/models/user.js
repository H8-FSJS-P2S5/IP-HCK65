'use strict';
const {
  Model
} = require('sequelize');
const { hasPassword } = require('../helpers/bcrypt');
const {main, sendVerificationEmail} = require('../helpers/nodemailer');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.ReadingList, {foreignKey : 'UserId'})
    }
  }
  User.init({
    fullName: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {
          msg : 'Name is required'
        },
        notNull : {
          msg : 'Name is not required'
        }
      }
    },
    address: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {
          msg : 'Address is required'
        },
        notNull : {
          msg : 'Address is not required'
        }
      }
    },
    phoneNumber: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {
          msg : ' Phone number is required'
        },
        notNull : {
          msg : 'Phone number is not required'
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : {
        msg : 'Email is already exist'
      },
      validate: {
        notEmpty : {
          msg : 'Email is required'
        },
        notNull : {
          msg : 'Email is not required'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {
          msg : 'Password is required'
        },
        notNull : {
          msg : 'Password is not required'
        },
        len : {
          args: [5],
          msg: "Password length min 5 character"
        }
      }
    },
    verifyToken : DataTypes.STRING,
    isVerify : DataTypes.BOOLEAN
  }, {
    hooks :{
      beforeCreate : (user, options) => {
        user.password = hasPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};