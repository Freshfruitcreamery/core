'use strict';
const { Model } = require('sequelize');
const { randomVal } = require('../utils/custom');

module.exports = (sequelize, DataTypes) => {
  class varieties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      varieties.belongsTo(models.items, {
        foreignKey: {
          name: 'item_id',
          type: DataTypes.STRING,
        },
      });
      varieties.belongsTo(models.collection, {
        foreignKey: {
          name: 'collection_id',
          type: DataTypes.STRING,
        },
      });
    }
  }
  varieties.init(
    {
      item_id: DataTypes.STRING,
      collection_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'varieties',
    }
  );
  varieties.beforeCreate((variety) => (variety.id = randomVal(10)));

  return varieties;
};
