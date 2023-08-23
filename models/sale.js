'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.PaymentMethod);
    }
  }
  Sale.init({
    subtotal: DataTypes.DOUBLE,
    total: DataTypes.DOUBLE,
    taxes: DataTypes.DOUBLE,
    paymentMethodId: DataTypes.INTEGER,
    saleState: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Sale',
  });
  return Sale;
};