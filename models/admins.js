'use strict';
const { Model } = require('sequelize');
const { randomVal } = require('../utils/custom');

module.exports = (sequelize, DataTypes) => {
  class admins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  admins.init(
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
    },
    {
      sequelize,
      modelName: 'admins',
    }
  );
  admins.beforeCreate((admin) => (admin.id = randomVal(10)));

  return admins;
};
