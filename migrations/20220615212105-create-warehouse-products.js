'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WarehouseProducts', {
      warehouseId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Warehouses',
          key: 'id'
        }
      },
      productId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
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
    await queryInterface.dropTable('WarehouseProducts');
  }
};