'use strict';
const { Model } = require('sequelize');
const { randomVal } = require('../utils/custom');

module.exports = (sequelize, DataTypes) => {
  class blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  blog.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
      badge: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'blog',
    }
  );
  blog.beforeCreate((blog) => (blog.id = randomVal(10)));

  return blog;
};
