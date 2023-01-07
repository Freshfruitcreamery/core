'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  notifications.init({
    message: DataTypes.STRING,
    image: DataTypes.STRING,
    link: DataTypes.STRING,
    initiator_id: DataTypes.STRING,
    received_by: DataTypes.STRING,
    seen: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'notifications',
  });
  return notifications;
};