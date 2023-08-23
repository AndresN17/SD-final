'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      weight: {
        type: Sequelize.FLOAT,
        defaultValue: 0.00
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      dimension: {
        type: Sequelize.STRING,
      },
      material: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      stateId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'States',
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
    await queryInterface.dropTable('Products');
  }
};