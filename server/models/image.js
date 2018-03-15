
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define('Image', {
    img_src: DataTypes.TEXT,
    UserId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      unique: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'user_id',
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return Image;
};