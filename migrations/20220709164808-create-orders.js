'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      ref: {
        type: Sequelize.STRING,
      },
      buyer_id: {
        type: Sequelize.STRING,
      },
      item_id: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.DOUBLE,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM(
          'initiated',
          'pending',
          'ordered',
          'accepted',
          'rejected',
          'processing',
          'processed',
          'delivering',
          'delivered',
          'fulfilled'
        ),
        defaultValue: 'initiated',
        allowNull: false,
      },
      addition: {
        type: Sequelize.BOOLEAN,
      },
      parent_item: {
        type: Sequelize.STRING,
      },
      ordered_time: {
        type: Sequelize.DATE,
      },
      accepted_time: {
        type: Sequelize.DATE,
      },
      rejected_time: {
        type: Sequelize.DATE,
      },
      processing_start_time: {
        type: Sequelize.DATE,
      },
      processing_end_time: {
        type: Sequelize.DATE,
      },
      delivery_start_time: {
        type: Sequelize.DATE,
      },
      delivery_end_time: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('orders');
  },
};
