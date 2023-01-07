'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('varieties', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      item_id: {
        type: Sequelize.STRING,
      },
      collection_id: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('varieties');
  },
};
