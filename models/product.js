'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.State);
      this.belongsToMany(models.Category, { through: 'ProductCategories' });
      this.belongsToMany(models.Image, { through: 'ProductImages' });
      this.belongsToMany(models.Warehouse, { through: 'WarehouseProducts' });
    }
  }
  Product.init({
    title: DataTypes.STRING,
    weight: DataTypes.FLOAT,
    price: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    dimension: DataTypes.STRING,
    material: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};