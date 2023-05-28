// import important parts of sequelize library
const { Model, DataTypes, INTEGER } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const Category = require('./Category');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal(value) {
          if (typeof value !== 'decimal') {
            throw new Error('Price must be decimal.')
          }
        }
      }
    },
    stock: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric(value) {
          if (typeof value !== 'numeric') {
            throw new Error('Stock must be a numeric value.')
          }
        }
      }
    },
    category_id: {
      type: INTEGER,
      references: {
        model: Category,
        key: id
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);



module.exports = Product;
