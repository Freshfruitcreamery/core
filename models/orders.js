'use strict';
const { Model } = require('sequelize');
const { randomVal } = require('../utils/custom');

module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orders.belongsTo(models.buyers, {
        foreignKey: {
          name: 'buyer_id',
          type: DataTypes.STRING,
        },
      });
      orders.belongsTo(models.items, {
        foreignKey: {
          name: 'item_id',
          type: DataTypes.STRING,
        },
      });
    }
  }
  orders.init(
    {
      ref: DataTypes.STRING,
      buyer_id: DataTypes.STRING,
      item_id: DataTypes.STRING,
      amount: DataTypes.FLOAT,
      quantity: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM(
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
      addition: DataTypes.BOOLEAN, //to tell if item bought is an addition to the main one or not. Value is true or false | 1 or 0
      parent_item: DataTypes.STRING,
      ordered_time: DataTypes.DATE,
      accepted_time: DataTypes.DATE,
      rejected_time: DataTypes.DATE,
      processing_start_time: DataTypes.DATE,
      processing_end_time: DataTypes.DATE,
      delivery_start_time: DataTypes.DATE,
      delivery_end_time: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'orders',
    }
  );
  orders.beforeCreate((order) => (order.id = randomVal(10)));

  return orders;
};
