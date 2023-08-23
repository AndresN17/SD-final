'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Province);
    }
  }
  City.init({
    name: DataTypes.STRING,
    acronym: DataTypes.STRING,
    provinceId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};