'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subtotal: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      taxes: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      total: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      paymentMethodId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'PaymentMethods',
          key: 'id'
        }
      },
      saleStateId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'SaleStates',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sales');
  }
};