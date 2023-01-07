'use strict';
const { Model } = require('sequelize');
const { randomVal } = require('../utils/custom');

module.exports = (sequelize, DataTypes) => {
  class addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      addresses.belongsTo(models.buyers, {
        foreignKey: {
          name: 'buyer_id',
          type: DataTypes.STRING,
        },
      });
    }
  }
  addresses.init(
    {
      title: DataTypes.STRING,
      address: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING,
      longitude: DataTypes.STRING,
      latitude: DataTypes.STRING,
      zipcode: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      buyer_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'addresses',
    }
  );
  addresses.beforeCreate((address) => (address.id = randomVal(10)));

  return addresses;
};
