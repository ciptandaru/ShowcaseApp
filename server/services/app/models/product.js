"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {foreignKey: "CategoryId"});
      Product.hasMany(models.Image, {foreignKey: "ProductId"});
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name Product cannot be empty!",
          },
          notEmpty: {
            msg: "Name Product cannot be empty!",
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Slug cannot be empty!",
          },
          notEmpty: {
            msg: "Slug cannot be empty!",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description cannot be empty!",
          },
          notEmpty: {
            msg: "Description cannot be empty!",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price cannot be empty!",
          },
          notEmpty: {
            msg: "Price cannot be empty!",
          },
          min: {
            args: [[30000]],
            msg: "Price should not be below 30000",
          },
        },
      },
      mainImg: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "mainImg cannot be empty!",
          },
          notEmpty: {
            msg: "mainImg cannot be empty!",
          },
        },
      },
      CategoryId: DataTypes.INTEGER,
      AuthorId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
