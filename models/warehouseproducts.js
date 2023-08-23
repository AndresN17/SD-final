'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WarehouseProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  WarehouseProducts.init({
    warehouseId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'WarehouseProducts',
  });
  return WarehouseProducts;
};