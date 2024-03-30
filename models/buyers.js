'use strict';
const { Model } = require('sequelize');
const { randomVal } = require('../utils/custom');

module.exports = (sequelize, DataTypes) => {
  class buyers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      buyers.hasMany(models.addresses, {
        foreignKey: {
          name: 'buyer_id',
          type: DataTypes.STRING,
        },
      });
      buyers.hasMany(models.comments, {
        foreignKey: {
          name: 'buyer_id',
          type: DataTypes.STRING,
        },
      });
      buyers.hasMany(models.orders, {
        foreignKey: {
          name: 'buyer_id',
          type: DataTypes.STRING,
        },
      });
      buyers.hasMany(models.transactions, {
        foreignKey: {
          name: 'buyer_id',
          type: DataTypes.STRING,
        },
      });
    }
  }
  buyers.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      gender: DataTypes.STRING,
      country: DataTypes.STRING,
      state: DataTypes.STRING,
      address: DataTypes.TEXT,
      zipcode: DataTypes.STRING,
      image: DataTypes.STRING,
      about: DataTypes.TEXT,
      longitude: DataTypes.STRING,
      latitude: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'buyers',
    }
  );
  buyers.beforeCreate((buyer) => (buyer.id = randomVal(10)));

  return buyers;
};
