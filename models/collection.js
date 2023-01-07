'use strict';
const { Model } = require('sequelize');
const otpGenerator = require('otp-generator');
const { randomVal } = require('../utils/custom');

module.exports = (sequelize, DataTypes) => {
  class collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      collection.hasMany(models.varieties, {
        foreignKey: {
          name: 'collection_id',
          type: DataTypes.STRING,
        },
      });
    }
  }
  collection.init(
    {
      name: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'collection',
    }
  );
  collection.beforeCreate((collection) => (collection.id = randomVal(10)));
  return collection;
};
