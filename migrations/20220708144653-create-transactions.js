'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ref: {
        type: Sequelize.STRING,
      },
      buyer_id: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.FLOAT,
      },
      discount: {
        type: Sequelize.FLOAT,
      },
      delivery_fee: {
        type: Sequelize.FLOAT,
      },
      delivery_mode: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.TEXT,
      },
      payment_gateway: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM(
          'initiated',
          'pending',
          'approved',
          'failed',
          'fulfilled'
        ),
        allowNull: false,
        defaultValue: 'initiated',
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
    await queryInterface.dropTable('transactions');
  },
};
