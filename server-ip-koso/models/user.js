"use strict";
const { hashPw, comparePwDecrypted } = require("../helper/bcrypt");
const { Op } = require("sequelize");
const { signToken } = require("../helper/jwt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.MyAnime, { foreignKey: "UserId" });
      User.hasMany(models.Transaction, { foreignKey: "UserId" });
    }

    static async registerUser(data) {
      try {
        const { username, email, password } = data;
        let createdUser = await User.create({
          username,
          email,
          password,
        });
        let message = {
          id: createdUser.id,
          username: createdUser.username,
          email: createdUser.email,
        };
        return message;
      } catch (error) {
        throw error;
      }
    }
    static async login(data) {
      try {
        const { inputCreds, password } = data;
        // console.log(data)
        let user;
        if (!inputCreds) {
          throw {
            name: "InvalidInput",
          };
        }
        if (!password) {
          throw {
            name: "InvalidInput",
          };
        }
        user = await User.findOne({
          where: {
            [Op.or]: [{ username: inputCreds }, { email: inputCreds }],
          },
        });

        if (!user) {
          throw {
            name: "BadInput",
          };
        }
        const validPassword = comparePwDecrypted(password, user.password);
        // console.log(validPassword)
        if (!validPassword) {
          throw {
            name: "BadInput",
          };
        }
        const access_token = signToken({ id: user.id, role: user.role });
        return access_token;
      } catch (error) {
        throw error;
      }
    }
    static async findUser(id) {
      try {
        let findUser = await this.findByPk(id);
        if (!findUser) throw { name: "notFound" };
        return findUser;
      } catch (error) {
        throw error;
      }
    }
    static async editUser(data, userLoggedId) {
      try {
        const { username, email, password } = data;
        // console.log(password, "INI PASSWORD DARI EDIT")
        if (!password) throw { name: "noPw" };
        const findUser = await User.findByPk(userLoggedId);
        // console.log(findUser)
        if (!findUser) throw { name: "notFound" };

        const newPassword = hashPw(password);

        await findUser.update({ username, email, password: newPassword });

        const findUserAgain = User.findByPk(userLoggedId, {
          attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        });

        return findUserAgain;
      } catch (error) {
        throw error;
      }
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "username is required",
          },
          notEmpty: {
            msg: "username is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "email must be unique",
        },
        validate: {
          notNull: {
            msg: "email is required",
          },
          isEmail: {
            msg: "email must be an email format",
          },
          notEmpty: {
            msg: "email is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password is required",
          },
          notEmpty: {
            msg: "password is required",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Free",
        validate: {
          notNull: {
            msg: "status is required",
          },
          notEmpty: {
            msg: "status is required",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (instance, options) => {
          instance.password = hashPw(instance.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
