'use strict';
const { Model } = require('sequelize');
const { randomVal } = require('../utils/custom');
module.exports = (sequelize, DataTypes) => {
  class delivery_distances extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  delivery_distances.init(
    {
      distance_from: DataTypes.INTEGER,
      distance_to: DataTypes.INTEGER,
      charge: DataTypes.FLOAT,
      is_public: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'delivery_distances',
    }
  );

  delivery_distances.beforeCreate(
    (delivery_distance) => (delivery_distance.id = randomVal(10))
  );
  return delivery_distances;
};
