'use strict';
module.exports = function(sequelize, DataTypes) {
  var linkUp = sequelize.define('linkUp', {
    name: DataTypes.STRING,
    message: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return linkUp;
};