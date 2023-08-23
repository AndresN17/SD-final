'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.City);
      this.belongsToMany(models.Product, { through: 'WarehouseProducts' });
    }
  }
  Warehouse.init({
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    cityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Warehouse',
  });
  return Warehouse;
};