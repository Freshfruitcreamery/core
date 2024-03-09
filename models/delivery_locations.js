'use strict';
const { Model } = require('sequelize');
const { randomVal } = require('../utils/custom');
const { areaTypes } = require('../utils/types');
module.exports = (sequelize, DataTypes) => {
  class delivery_locations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  delivery_locations.init(
    {
      location: DataTypes.STRING,
      area: DataTypes.ENUM(areaTypes),
      price: DataTypes.FLOAT,
      is_public: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'delivery_locations',
    }
  );

  delivery_locations.beforeCreate(
    (delivery_location) => (delivery_location.id = randomVal(10))
  );
  return delivery_locations;
};
