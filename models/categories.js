'use strict';
const { Model } = require('sequelize');
const otpGenerator = require('otp-generator');
const { randomVal } = require('../utils/custom');

module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      categories.hasMany(models.items, {
        foreignKey: {
          name: 'cat_id',
          type: DataTypes.STRING,
        },
      });
      categories.hasMany(models.items, {
        foreignKey: {
          name: 'parent_cat_id',
          type: DataTypes.STRING,
        },
        as: 'parent_cat',
      });
      categories.hasMany(models.items, {
        foreignKey: {
          name: 'grand_parent_id',
          type: DataTypes.STRING,
        },
        as: 'grand_parent_cat',
      });
      categories.hasMany(models.items, {
        foreignKey: {
          name: 'great_grand_parent_id',
          type: DataTypes.STRING,
        },
        as: 'great_grand_parent_cat',
      });
      categories.hasOne(models.categories_collection, {
        foreignKey: {
          name: 'category_id',
          type: DataTypes.STRING,
        },
        as: 'category',
      });
    }
  }
  categories.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      type: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      image: DataTypes.STRING,
      parent_cat_id: DataTypes.STRING,
      child_cat_id: DataTypes.STRING,
      sub_child_cat_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'categories',
    }
  );
  categories.beforeCreate((category) => (category.id = randomVal(10)));
  return categories;
};
