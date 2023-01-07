'use strict';
const { Model } = require('sequelize');
const { randomVal } = require('../utils/custom');

module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comments.belongsTo(models.items, {
        foreignKey: {
          name: 'item_id',
          type: DataTypes.STRING,
        },
      });
      comments.belongsTo(models.buyers, {
        foreignKey: {
          name: 'buyer_id',
          type: DataTypes.STRING,
        },
      });
    }
  }
  comments.init(
    {
      comment: DataTypes.TEXT,
      rating: DataTypes.DOUBLE,
      item_id: DataTypes.STRING,
      buyer_id: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'comments',
    }
  );
  comments.beforeCreate((comment) => (comment.id = randomVal(10)));

  return comments;
};
