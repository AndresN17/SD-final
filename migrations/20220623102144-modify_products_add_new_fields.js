"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Products", "rating", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn("Products", "measure", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn("Products", "rating")]);
  },
};
