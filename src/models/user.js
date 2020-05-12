'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    user.belongsToMany(models.group, { through: 'userGroup' });
    user.hasMany(models.chatMessage);
    user.hasMany(models.deal);
    user.hasMany(models.comment);
    user.hasMany(models.review);
    user.hasMany(models.publication);
    user.hasMany(models.item);

  };
  return user;
};
