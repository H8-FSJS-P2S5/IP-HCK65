"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {
        foreignKey: "UserId",
      });
      Review.belongsTo(models.Movies, {
        foreignKey: "MovieId",
      });
    }
  }
  Review.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required",
          },
          notNull: {
            msg: "Name is required",
          },
        },
      },
      headline: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "headline is required",
          },
          notNull: {
            msg: "headline is required",
          },
        },
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "review is required",
          },
          notNull: {
            msg: "review is required",
          },
        },
      },
      UserId: DataTypes.INTEGER,
      MovieId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
