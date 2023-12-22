'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReadingList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReadingList.belongsTo(models.User, {foreignKey : 'UserId'})
    }
  }
  ReadingList.init({
    title: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    BookId : DataTypes.STRING,
    imageUrl : DataTypes.TEXT,
    author : DataTypes.STRING,
    publisher : DataTypes.STRING,
    publisherDate : DataTypes.STRING,
    pages : DataTypes.STRING,
    linkReading : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ReadingList',
  });
  return ReadingList;
};