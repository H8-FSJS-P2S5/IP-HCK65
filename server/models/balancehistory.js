'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BalanceHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BalanceHistory.belongsToMany(models.User, {
        through: "Users",
        foreignKey: "user_id",
        as: "Tessss"
      })
    }
  }
  BalanceHistory.init({
    transaction_type: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BalanceHistory',
  });
  return BalanceHistory;
};