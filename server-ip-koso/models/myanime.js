"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyAnime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyAnime.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  MyAnime.init(
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
      MALId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "MALId is required",
          },
          notEmpty: {
            msg: "MALId is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "MyAnime",
    }
  );
  return MyAnime;
};
