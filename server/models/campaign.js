'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Campaign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Campaign.hasMany(models.Transaction, {
        foreignKey: "campaign_id"
      })
    }
  }
  Campaign.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    total_fundraising: DataTypes.INTEGER,
    image_1: DataTypes.STRING,
    image_2: DataTypes.STRING,
    image_3: DataTypes.STRING,
    remaining_balance: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Campaign',
  });
  return Campaign;
};