'use strict';
const { Model } = require('sequelize');
const { randomVal } = require('../utils/custom');

module.exports = (sequelize, DataTypes) => {
  class categories_collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      categories_collection.belongsTo(models.categories, {
        foreignKey: {
          name: 'category_id',
          type: DataTypes.STRING,
        },
        as: 'category',
      });
    }
  }
  categories_collection.init(
    {
      category_id: DataTypes.STRING,
      is_visible: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'categories_collection',
    }
  );

  categories_collection.beforeCreate(
    (category_collection) => (category_collection.id = randomVal(10))
  );

  return categories_collection;
};
