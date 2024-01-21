'use strict';
const { Model } = require('sequelize');
const otpGenerator = require('otp-generator');
const { randomVal } = require('../utils/custom');

module.exports = (sequelize, DataTypes) => {
  class items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      items.belongsTo(models.categories, {
        foreignKey: {
          name: 'cat_id',
          type: DataTypes.STRING,
        },
      });
      items.belongsTo(models.categories, {
        foreignKey: {
          name: 'parent_cat_id',
          type: DataTypes.STRING,
        },
        as: 'parent_cat',
      });
      items.belongsTo(models.categories, {
        foreignKey: {
          name: 'grand_parent_id',
          type: DataTypes.STRING,
        },
        as: 'grand_parent_cat',
      });
      items.belongsTo(models.categories, {
        foreignKey: {
          name: 'great_grand_parent_id',
          type: DataTypes.STRING,
        },
        as: 'great_grand_parent_cat',
      });
      items.hasMany(models.varieties, {
        foreignKey: {
          name: 'item_id',
          type: DataTypes.STRING,
        },
      });
      items.hasMany(models.comments, {
        foreignKey: {
          name: 'item_id',
          type: DataTypes.STRING,
        },
      });
      items.hasMany(models.orders, {
        foreignKey: {
          name: 'item_id',
          type: DataTypes.STRING,
        },
      });
    }
  }
  items.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      cat_id: DataTypes.STRING,
      parent_cat_id: DataTypes.STRING,
      grand_parent_id: DataTypes.STRING,
      great_grand_parent_id: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      image1: DataTypes.STRING,
      image2: DataTypes.STRING,
      image3: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'items',
    }
  );
  items.beforeCreate((item) => (item.id = randomVal(10)));

  return items;
};
