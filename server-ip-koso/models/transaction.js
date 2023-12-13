"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Transaction.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "UserId is required",
          },
          notEmpty: {
            msg: "UserId is required",
          },
        },
      },
      transaction_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "transaction_id is required",
          },
          notEmpty: {
            msg: "transaction_id is required",
          },
        },
      },
      payment_gateway_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "payment_gateway_id is required",
          },
          notEmpty: {
            msg: "payment_gateway_id is required",
          },
        },
      },
      status: { type: DataTypes.STRING, defaultValue: "PENDING" },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
