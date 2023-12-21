"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movies.hasMany(models.Genre, { foreignKey: "GenreId" });
      Movies.hasMany(models.Review, { foreignKey: "MovieId" });
    }
  }
  Movies.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title is required",
          },
          notNull: {
            msg: "Title is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "description is required",
          },
          notNull: {
            msg: "description is required",
          },
        },
      },
      Stars: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Stars is required",
          },
          notNull: {
            msg: "Stars is required",
          },
        },
      },
      GenreId: DataTypes.INTEGER,
      images: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "images is required",
          },
          notNull: {
            msg: "images is required",
          },
        },
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Year is required",
          },
          notNull: {
            msg: "Year is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Movies",
    }
  );
  return Movies;
};
