'use strict';
const { Model } = require('sequelize');
const { randomVal } = require('../utils/custom');

module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transactions.belongsTo(models.buyers, {
        foreignKey: {
          name: 'buyer_id',
          type: DataTypes.STRING,
        },
      });
    }
  }
  transactions.init(
    {
      ref: DataTypes.STRING,
      buyer_id: DataTypes.STRING,
      status: DataTypes.STRING,
      amount: DataTypes.FLOAT,
      discount: DataTypes.FLOAT,
      delivery_fee: DataTypes.FLOAT,
      delivery_mode: DataTypes.STRING,
      address: DataTypes.TEXT,
      payment_gateway: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM(
          'initiated',
          'pending',
          'paid',
          'approved',
          'failed',
          'fulfilled'
        ),
        allowNull: false,
        defaultValue: 'initiated',
      },
    },
    {
      sequelize,
      modelName: 'transactions',
    }
  );
  // transactions.beforeCreate((transaction) => (transaction.id = randomVal(10)));

  return transactions;
};
