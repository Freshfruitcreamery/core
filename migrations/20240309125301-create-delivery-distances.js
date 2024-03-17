'use strict';

const { areaTypes } = require('../utils/types');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('delivery_distances', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      is_public: {
        type: Sequelize.BOOLEAN,
      },
      distance_from: {
        type: Sequelize.INTEGER,
      },
      distance_to: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('delivery_distances');
  },
};
